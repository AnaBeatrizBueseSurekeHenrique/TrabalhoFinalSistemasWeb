import { EntityRepository, Repository } from "typeorm";
import Manga from "../entities/Manga";

interface IRequest{
    title: string;
    author_name: string;
    target_demographic: string;
    quantity_volumes: number;
    publisher: IPublisher;
}
interface IPublisher{
    id:string;
    mangas: IRequest[];
    name: string;
    description: string;  
    country_of_origin: string;
    headquarters: string;
}

@EntityRepository(Manga)
export default class MangasRepository extends Repository<Manga>{
    public async findById(id: string) : Promise<Manga | undefined>{
        const manga = await this.findOne(id, {relations:['publisher']});
        console.log("MANGA:", manga);
        return manga;
    }
    public async findByTitle(title: string) : Promise<Manga | undefined>{
        const manga = await this.findOne({
            where: {title}
        });
        return manga;
    }
    public async findAllMangas() : Promise<Manga[]>{
        const mangas = await this.find({relations:['publisher']});
        return mangas;
    }
    public async createManga({title, author_name, target_demographic, quantity_volumes, publisher}: IRequest){
        const manga = this.create({title, author_name, target_demographic, quantity_volumes, publisher});
        this.save(manga);
        return manga;
    }
}