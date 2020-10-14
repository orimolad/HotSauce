import { IHasName, MongoDbItemClientFactory } from "../clients/mongodb/MongoDBItemClientFactory";
import { Express } from 'express';
import { FilterQuery } from "mongodb";

export interface IEndpoint {
    registerEndpoint:(app:Express)=>Promise<void>
}

export class EndpointFactory<T extends IHasName> implements IEndpoint{
    private endpointName:string;
    private mongoClient: MongoDbItemClientFactory<T>;

    constructor(endpointName:string){
        this.endpointName = endpointName;
        this.mongoClient = new MongoDbItemClientFactory<T>(this.endpointName);
    }

    async registerEndpoint(app:Express){
        await this.mongoClient.build();
        
        app.post(`/${this.endpointName}`, async (req, res) => {
            //create user from request json
            let item = await this.mongoClient.create(req.body)
            res.json(item)
        })

        app.patch(`/${this.endpointName}`, async (req, res) => {
            //update user from request json
            let item = await this.mongoClient.update(req.body)
            res.json(item)
        })

        app.get(`/${this.endpointName}/:name`, (req, res) => {
            //get user user by name
            let query = { name: req.params.name } as FilterQuery<T>
            this.mongoClient.read(query).next().then((item) => {
                console.log('user', item)
                res.send(item)
            })

        })

        app.delete(`/${this.endpointName}/:name`, async (req, res) => {
            //delete a user by name
            let item = await this.mongoClient.delete({ name: req.params.name } as IHasName & Partial<T>)
            res.json(item)
        })
    }
}