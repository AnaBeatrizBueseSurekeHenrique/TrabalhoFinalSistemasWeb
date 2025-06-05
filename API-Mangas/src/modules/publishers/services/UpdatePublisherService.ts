import { getCustomRepository } from "typeorm";
import Publisher from "../typeorm/entities/Publisher";
import PublishersRepository from "../typeorm/repositories/PublishersRepository";
import AppError from "@shared/errors/AppError";

interface IRequest{
    id:string;
    name:string;
    description: string;
    country_of_origin: string;
    headquarters: string;
    foundation_date: Date;
}
export default class UpdatePublisherService{
    public async execute({id, name, description, country_of_origin, headquarters, foundation_date} : IRequest) : Promise<Publisher>{
        const publisherRepository = getCustomRepository(PublishersRepository);
        const publisher = await publisherRepository.findOne(id);
        if(!publisher){
            throw new AppError('Publisher not found!');
        }
        const publisherExists = await publisherRepository.findByName(name);
        if(publisherExists && name != publisher.name){
            throw new AppError('There is already a publisher with that name!');
        }
        publisher.name = name;
        publisher.description = description;
        publisher.country_of_origin = country_of_origin;
        publisher.headquarters = headquarters;
        publisher.foundation_date = foundation_date;
        await publisherRepository.save(publisher);
        return publisher;
    }
}