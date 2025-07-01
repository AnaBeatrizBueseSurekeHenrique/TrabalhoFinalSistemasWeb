import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import Manga from "../typeorm/entities/Manga";
import MangasRepository from "../typeorm/repositories/MangasRepository";

interface IRequest{
    id: string;
}
export default class ShowMangaService{
    public async execute({id}: IRequest) : Promise<Manga>{
        const mangasRepository = getCustomRepository(MangasRepository);
        const manga = await mangasRepository.findById(id);

        if(!manga){
            throw new AppError('Manga not found!');
        }

        return manga;
    }
}