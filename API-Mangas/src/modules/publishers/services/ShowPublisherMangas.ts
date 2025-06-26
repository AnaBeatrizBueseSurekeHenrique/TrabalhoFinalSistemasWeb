import { getCustomRepository } from "typeorm";
import Publisher from "../typeorm/entities/Publisher";
import PublishersRepository from "../typeorm/repositories/PublishersRepository";
import AppError from "@shared/errors/AppError";

interface IRequest{
    id: string;
}
export default class ShowPublisherMangaService{
    public async execute({id}: IRequest) : Promise<Publisher>{
        const publisherRepository = getCustomRepository(PublishersRepository);
        const publisher = await publisherRepository.findPublisherMangas(id);
        if(!publisher){
            throw new AppError('Publisher not found!');
        }
        return publisher;
    }
}