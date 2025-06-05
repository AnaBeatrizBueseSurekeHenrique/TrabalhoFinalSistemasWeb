import { NextFunction, Request, Response } from "express";
import ListPublisherService from "../services/ListPublisherService";
import ShowPublisherService from "../services/ShowPublisherService";
import CreatePublisherService from "../services/CreatePublisherService";
import UpdatePublisherService from "../services/UpdatePublisherService";
import DeletePublisherService from "../services/DeletePublisherService";

export default class PublishersController{
    public async index(request: Request, response: Response, next: NextFunction) : Promise<Response | void>{
        try{
            const listPublishers = new ListPublisherService();
            const publishers = await listPublishers.execute();
            return response.json(publishers);
        }catch(err){
            next(err);
        }
    }
    public async show(request: Request, response: Response, next: NextFunction) : Promise<Response | void>{
        try{
            const {id} = request.params;
            const showPublisher = new ShowPublisherService();
            const publisher = await showPublisher.execute({id});
            return response.json(publisher);
        }catch(err){
            next(err);
        }
    }
    public async create(request: Request, response: Response, next: NextFunction) : Promise<Response | void>{
        try{
            const {name, description, country_of_origin, headquarters, foundation_date} = request.body;
            const createPublisher = new CreatePublisherService();
            const publisher = await createPublisher.execute({name, description, country_of_origin, headquarters, foundation_date});
            return response.json(publisher);
        } catch(err){
            next(err);
        }
    }
    public async update(request: Request, response: Response, next: NextFunction) : Promise<Response | void>{
        try{
            const {name, description, country_of_origin, headquarters, foundation_date} = request.body;
            const {id} = request.params;
            const updatePublisher = new UpdatePublisherService();
            const publisher = await updatePublisher.execute({id, name, description, country_of_origin, headquarters, foundation_date});
            return response.json(publisher);
        } catch(err){
            next(err)
        }
    }
    public async delete(request: Request, response: Response, next: NextFunction) : Promise<Response | void>{
        try{
            const {id} = request.params;
            const deletePublisher = new DeletePublisherService();
            await deletePublisher.execute({id});
            return response.json([]);
        } catch(err){
            next(err);
        }
    }
}