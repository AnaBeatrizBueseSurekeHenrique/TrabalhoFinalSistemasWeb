import { Entity, EntityRepository, Repository } from "typeorm";
import Publisher from "../entities/Publisher";
@EntityRepository(Publisher)
export default class PublishersRepository extends Repository<Publisher>{
    public async findByName(name: string): Promise<Publisher | undefined>{
        const publisher = this.findOne({
            where: {name}
        })
        return publisher;
    }
}