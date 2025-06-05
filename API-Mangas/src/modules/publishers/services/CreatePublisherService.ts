import { getCustomRepository } from "typeorm";
import Publisher from "../typeorm/entities/Publisher";
import PublishersRepository from "../typeorm/repositories/PublishersRepository";
import AppError from "@shared/errors/AppError";

interface IRequest{
    name:string;
    description: string;
    country_of_origin: string;
    headquarters: string;
    foundation_date: Date;
}
export default class CreatePublisherService{
    public async execute({name, description, country_of_origin, headquarters, foundation_date} : IRequest) : Promise<Publisher>{
        const publisherRepository = getCustomRepository(PublishersRepository);
        const publisherExists = await publisherRepository.findByName(name);
        if(publisherExists){
            throw new AppError('There is already one publisher with that name, so it cannot be created again!');
        }
        const publisher = publisherRepository.create({
            name, description, country_of_origin, headquarters, foundation_date
        });
        await publisherRepository.save(publisher);
        return publisher;
    }
}