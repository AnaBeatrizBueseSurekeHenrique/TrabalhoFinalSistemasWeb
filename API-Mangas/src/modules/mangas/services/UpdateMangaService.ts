import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import Manga from "../typeorm/entities/Manga";
import Publisher from "@modules/publishers/typeorm/entities/Publisher";
import MangasRepository from "../typeorm/repositories/MangasRepository";
import PublishersRepository from "@modules/publishers/typeorm/repositories/PublishersRepository";

interface IPublisher {
  publisher: Publisher;
}

interface IRequest {
    id:string;
    title: string;
    author_name: string;
    target_demographic: string;
    quantity_volumes: number;
    publisher_name: string;
}

export default class UpdateMangaService{
    public async execute({id, title, author_name, target_demographic, quantity_volumes, publisher_name} : IRequest) : Promise<Manga>{
        const mangaRepository = getCustomRepository(MangasRepository);
        const manga = await mangaRepository.findOne(id);
        if(!manga){
            throw new AppError('Manga not found!');
        }
        const mangaExists = await mangaRepository.findByTitle(title);
        if(mangaExists && title != manga.title){
            throw new AppError('There is already a manga with that title!');
        }
        if(publisher_name){
            const publisherRepository = getCustomRepository(PublishersRepository);
            const existsPublisher = await publisherRepository.findByName(publisher_name);
            if (existsPublisher == undefined) {
                throw new AppError("This publishers doesnt exist!");
            }
            manga.publisher = existsPublisher;
        }
        manga.title = title;
        manga.author_name = author_name;
        manga.target_demographic = target_demographic;
        manga.quantity_volumes = quantity_volumes;
        await mangaRepository.save(manga);
        return manga;
    }
}