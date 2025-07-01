import { Entity, EntityRepository, Repository } from "typeorm";
import Publisher from "../entities/Publisher";
import Manga from "@modules/mangas/typeorm/entities/Manga";

@EntityRepository(Publisher)
export default class PublishersRepository extends Repository<Publisher>{
    public async findByName(name: string): Promise<Publisher | undefined>{
        const publisher = this.findOne({
            where: {name}
        })
        return publisher;
    }
    public async findById(id: string) : Promise<Publisher | undefined>{
        const publisher = this.findOne({
            where: {id}
        })
        return publisher;
    }
    public async findPublisherMangas(id: string) : Promise<Publisher | undefined>{
         const publisher = this.findOne({
            where: {id}, relations:['mangas']
        })
        return publisher;
    } 
}