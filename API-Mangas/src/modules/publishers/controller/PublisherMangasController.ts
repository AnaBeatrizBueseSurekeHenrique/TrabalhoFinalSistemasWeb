import { NextFunction, Request, Response } from "express";
import ShowPublisherMangaService from "../services/ShowPublisherMangasService";

export default class PublisherMangasController{

public async show(request: Request, response: Response, next: NextFunction) : Promise<Response | void>{
        try{
            const {id} = request.params;
            const showPublisherManga = new ShowPublisherMangaService();
            const publisher = await showPublisherManga.execute({id});
            return response.json(publisher);
        }catch(err){
            next(err);
        }
    }
}