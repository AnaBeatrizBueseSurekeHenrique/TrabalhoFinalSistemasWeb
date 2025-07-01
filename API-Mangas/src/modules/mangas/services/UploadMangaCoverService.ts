import { getCustomRepository } from "typeorm";
import Manga from "../typeorm/entities/Manga";
import MangasRepository from "../typeorm/repositories/MangasRepository";
import AppError from "@shared/errors/AppError";
import uploadConfig from '@config/upload';
import path from 'path';
import fs from 'fs';
import { Console } from "console";

interface IRequest{
    id: string;
    coverFileName: string
}
export default class UploadMangaCoverService{
    public async execute({id, coverFileName} : IRequest) : Promise<Manga>{
        const mangaRepository = getCustomRepository(MangasRepository);
        const manga = await mangaRepository.findById(id);
        console.log("AAA", manga);
        if(!manga){
            console.log("AAAAAAAAAAAAAAAAAAA");
            throw new AppError('Manga not found!');
        }
        console.log("Manga : ");
        if(manga.cover){
            const mangaCoverFilePath = path.join(uploadConfig.directory, manga.cover);
            const mangaCoverFileExists = await fs.promises.stat(mangaCoverFilePath);
            if(mangaCoverFileExists){
                await fs.promises.unlink(mangaCoverFilePath);
            }
        }

        manga.cover = coverFileName;
        await mangaRepository.save(manga);
        return manga;
    }
}