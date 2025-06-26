import { getCustomRepository } from "typeorm";
import Manga from "../typeorm/entities/Manga";
import MangasRepository from "../typeorm/repositories/MangasRepository";
import AppError from "@shared/errors/AppError";
import uploadConfig from '@config/upload';
import path from 'path';
import fs from 'fs';

interface IRequest{
    manga_id: string;
    coverFileName: string
}
export default class UploadMangaCoverService{
    public async execute({manga_id, coverFileName} : IRequest) : Promise<Manga>{
        const mangasRepository = getCustomRepository(MangasRepository);    
        const manga = await mangasRepository.findById(manga_id);
        if(!manga){
            throw new AppError('Manga not found.');
        }
        if(manga.cover){
            const mangaCoverFilePath = path.join(uploadConfig.directory, manga.cover);
            const mangaCoverFileExists = await fs.promises.stat(mangaCoverFilePath);
            if(mangaCoverFileExists){
                await fs.promises.unlink(mangaCoverFilePath);
            }
        }
        manga.cover = coverFileName;
        await mangasRepository.save(manga);
        return manga;
    }
}