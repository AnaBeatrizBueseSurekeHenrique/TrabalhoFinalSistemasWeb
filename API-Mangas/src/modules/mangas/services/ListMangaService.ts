import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import Manga from "../typeorm/entities/Manga";
import MangasRepository from "../typeorm/repositories/MangasRepository";


export default class ListMangaService{
    public async execute() : Promise<Manga[]>{
        const mangasRepository = getCustomRepository(MangasRepository);
        const mangas = await mangasRepository.findAllMangas();
        console.log(mangas);
        return mangas;
    }
}