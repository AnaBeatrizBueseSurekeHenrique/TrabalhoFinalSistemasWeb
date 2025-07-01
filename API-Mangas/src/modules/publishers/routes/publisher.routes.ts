import { Router } from "express";
import PublishersController from "../controller/PublishersController";
import { celebrate, Joi, Segments } from "celebrate";
import PublisherMangasController from "../controller/PublisherMangasController";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";

const publishersRouter = Router();
const publisherController = new PublishersController();
const publisherMangaController = new PublisherMangasController();


publishersRouter.use(isAuthenticated);

publishersRouter.get('/mangas/:id', celebrate({
    [Segments.PARAMS] : {id: Joi.string().uuid().required()}
}),    
    async(req,res,next) =>{
    try{
        await publisherMangaController.show(req,res,next);
    }catch(err){
        next(err);
    }
});

publishersRouter.get('/', async(req,res,next) =>{
    try{
        await publisherController.index(req,res,next);
    }catch(err){
        next(err);
    }
});
publishersRouter.get('/:id', celebrate({
    [Segments.PARAMS] : {id: Joi.string().uuid().required()}
}),    
    async(req,res,next) =>{
    try{
        await publisherController.show(req,res,next);
    }catch(err){
        next(err);
    }
});
publishersRouter.post('/', celebrate({
    [Segments.BODY] : {
        name: Joi.string().required(),
        description: Joi.string().optional(),
        country_of_origin: Joi.string().required(),
        headquarters: Joi.string().required(),
        foundation_date: Joi.date().required(),
    }
}),
    
    async(req,res,next) =>{
    try{
        await publisherController.create(req,res,next);
    }catch(err){
        next(err);
    }
});
publishersRouter.put('/:id', celebrate({
    [Segments.PARAMS] : {id: Joi.string().uuid().required()},
    [Segments.BODY] : {
        name: Joi.string().optional(),
        description: Joi.string().optional(),
        country_of_origin: Joi.string().required(),
        headquarters: Joi.string().required(),
        foundation_date: Joi.date().required(),
    }
}),
    
    async(req,res,next) =>{
    try{
        await publisherController.update(req,res,next);
    }catch(err){
        next(err);
    }
});

publishersRouter.delete('/:id', celebrate({
    [Segments.PARAMS] : {id: Joi.string().uuid().required()}
}),    
     async(req,res,next) =>{
    try{
        await publisherController.delete(req,res,next);
    }catch(err){
        next(err);
    }
})
export default publishersRouter;