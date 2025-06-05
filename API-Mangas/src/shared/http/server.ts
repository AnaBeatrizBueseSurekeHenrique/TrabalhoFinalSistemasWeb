import 'reflect-metadata'
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';
import routes from './routes';
import AppError from '../errors/AppError';
import '../typeorm'
import { errors } from 'celebrate';

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());
app.use((error: Error, request: Request, response : Response, next : NextFunction) : void =>{
    console.log("error" + error);
    if(error instanceof AppError){
        response.status(error.statusCode).json({
            status: 'error',
            message : error.message
        })
    }
    response.status(500).json({
        status: 'error',
        message : 'internal server Error'
    })
});

app.listen(3333, () =>{
    console.log('Server started on port 3333!');
})