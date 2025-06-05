import { getCustomRepository } from "typeorm";
import Publisher from "../typeorm/entities/Publisher";
import PublishersRepository from "../typeorm/repositories/PublishersRepository";
import AppError from "@shared/errors/AppError";


export default class ListPublisherService{
    public async execute() : Promise<Publisher[]>{
        const publisherRepository = getCustomRepository(PublishersRepository);
        const publishers = await publisherRepository.find();
        return publishers;
    }
}