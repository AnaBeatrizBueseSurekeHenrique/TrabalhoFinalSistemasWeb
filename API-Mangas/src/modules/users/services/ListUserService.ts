import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import AppError from "@shared/errors/AppError";

interface IRequest{
    name: string;
    email: string;
    password: string;
}
export default class ListUserService{
    public async execute() : Promise<User[]>{
        const usersRepository = getCustomRepository(UsersRepository);
        const users = await usersRepository.find();
        return users
    }
}