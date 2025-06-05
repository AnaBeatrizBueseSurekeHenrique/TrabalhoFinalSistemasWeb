import { getCustomRepository } from "typeorm";
import Publisher from "../typeorm/entities/Publisher";
import PublishersRepository from "../typeorm/repositories/PublishersRepository";
import AppError from "@shared/errors/AppError";

interface IRequest{
    id: string;
}
export default class DeletePublisherService{
    public async execute({id}: IRequest) : Promise<void>{
        const publisherRepository = getCustomRepository(PublishersRepository);
        const publisher = await publisherRepository.findOne(id);
        if(!publisher){
            throw new AppError('Publisher not found!');
        }
        await publisherRepository.remove(publisher);
    }
}