import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import AppError from "@shared/errors/AppError";
import { hash } from "bcryptjs";

interface IRequest{
    name: string;
    email: string;
    password: string;
}
export default class CreateUserService{
    public async execute({name, email, password} : IRequest) : Promise<User>{
        const usersRepository = getCustomRepository(UsersRepository);
        const emailExists = await usersRepository.findByEmail(email);
            if(emailExists){
                throw new AppError('Email adress already used!');
            }
            const hashedPassword = await hash(password,8);
            const user = usersRepository.create({
                name, 
                email,
                password: hashedPassword,
            });
            await usersRepository.save(user);
            return user;
    }
}