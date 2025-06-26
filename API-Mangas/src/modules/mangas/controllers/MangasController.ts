import { NextFunction, Request, Response } from "express";
import CreateMangaService from "../services/CreateMangaService";
import ListMangaService from "../services/ListMangaService";
import ShowMangaService from "../services/ShowMangaService";
import UpdateMangaService from "../services/UpdateMangaService";
import DeleteMangaService from "../services/DeleteMangaService";

export default class MangasController{
    public async create(request: Request, response: Response, next: NextFunction) : Promise<Response | void>{
        try{
            const{title, author_name, target_demographic, quantity_volumes, publisher_name} = request.body;
            const createManga = new CreateMangaService();
            const manga = await createManga.execute({title, author_name, target_demographic, quantity_volumes, publisher_name});
            return response.json(manga);
        } catch(err){
            next(err);
        }
    }
    public async show(request: Request, response: Response, next: NextFunction) : Promise<Response | void>{
        try{
            const {id} = request.params;
            const showManga = new ShowMangaService();
            const manga = await showManga.execute({id});
            return response.json(manga);
        }catch(err){
            next(err);
        }
    }
    public async index(request: Request, response: Response, next: NextFunction) : Promise<Response | void>{
        try{
            const listManga = new ListMangaService();
            const mangas = await listManga.execute();
            return response.json(mangas);
        }catch(err){
            next(err);
        }
    }
    public async update(request: Request, response: Response, next: NextFunction) : Promise<Response | void>{
        try{
            const{title, author_name, target_demographic, quantity_volumes, publisher_name} = request.body;
            const {id} = request.params;
            const updateManga = new UpdateMangaService();
            const manga = await updateManga.execute({id, title, author_name, target_demographic, quantity_volumes, publisher_name});
            return response.json(manga);
        } catch(err){
            next(err)
        }
    }
    public async delete(request: Request, response: Response, next: NextFunction) : Promise<Response | void>{
        try{
            const {id} = request.params;
            const deleteManga = new DeleteMangaService();
            await deleteManga.execute({id});
            return response.json([]);
        } catch(err){
            next(err);
        }
    }
}