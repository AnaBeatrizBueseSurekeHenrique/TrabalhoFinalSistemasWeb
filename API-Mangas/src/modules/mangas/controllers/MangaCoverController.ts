import { NextFunction, Request, Response } from "express";
import UploadMangaCoverService from "../services/UploadMangaCoverService";

export default class MangaCoverController{
    public async update(request : Request, response : Response, next : NextFunction) : Promise<Response | void>{
        try{
            const uploadMangaCover = new UploadMangaCoverService();
            const {id} = request.params;
            const manga = await uploadMangaCover.execute({id : id, coverFileName: request.file?.filename as string});
            return response.json(manga);
         }catch(err){
            next(err);
         }
    }
}