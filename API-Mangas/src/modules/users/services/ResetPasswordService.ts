import { getCustomRepository } from "typeorm";
import UserRepository from "../typeorm/repositories/UsersRepository";
import AppError from "src/shared/errors/AppError";
import { addHours, isAfter } from "date-fns";
import { hash } from "bcryptjs";
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";

interface IRequest{
    token: string;
    password: string;
}

export default class ResetPasswordService{
    public async execute({token, password} : IRequest) : Promise<void>{
        const userRepository = getCustomRepository(UserRepository);
        const userTokenRepository = getCustomRepository(UserTokensRepository);
        const userToken = await userTokenRepository.findByToken(token);
        if(!userToken){
            throw new AppError('Token does not exist.');
        }
        const user = await userRepository.findById(userToken.user_id);
        if(!user){
            throw new AppError('User does not exist.');
        }
        const tokenCreatedAt = userToken.created_at;
        const compareDate = addHours(tokenCreatedAt, 2);
        if(isAfter(Date.now(), compareDate)){
            throw new AppError('Token expired.');
        }
        user.password = await hash(password, 8);
        await userRepository.save(user);
    }
}