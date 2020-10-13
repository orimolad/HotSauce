import assert = require("assert");
import { Cursor, Db, DeleteWriteOpResultObject, FilterQuery, MongoClient } from "mongodb";

export interface IHasName { name: string }
export type MongoItem<T> = { _id: string } & T;
export interface IMongoDBItemClient<T extends IHasName> {
    create: (item: T) => Promise<T | void>;
    read: (query: FilterQuery<T>) => Cursor<MongoItem<T>>;
    update: (item: T) => Promise <T | void>;
    delete: (item: Partial<T> & IHasName) => Promise <T | void>;
}

export class MongoDbItemClientFactory<T extends IHasName > implements IMongoDBItemClient<T>{
    public collection_name: string;
    private dbName: string;
    private client: MongoClient;
    private db: Db;
    private connectedFlag: boolean;
    private url: string;
    private isConnecting: boolean;

    constructor(collectionName: string) {
        this.collection_name = collectionName;

        // Connection URL
        this.url = 'mongodb://localhost:27017';

        // Database Name
        this.dbName = 'hot';

        // Create a new MongoClient
        this.client = new MongoClient(this.url, { useUnifiedTopology: true });

        this.connectedFlag = false;
        this.isConnecting = false;
    }

    public build(): Promise<void> {
        if (!this.isConnecting) {
            this.isConnecting = true;
            return new Promise(((res, rej) => {
                this.client.connect((async (err) => {
                    assert.equal(null, err);
                    console.log("Connected successfully to server");

                    this.db = this.client.db(this.dbName);
                    this.connectedFlag = true;

                    //resolves the promise
                    res()
                }).bind(this));
            }).bind(this))
        }else{
            throw {error:"already trying to connect"}
        }
    }

    public dispose() {
        this.client.close();
        this.client = new MongoClient(this.url);
        this.isConnecting = false;
        this.connectedFlag = false;
    }

    //Returns false if the item doesn't exist
    //Returns the query if the item does exist
    public async itemExistsByName(item: Partial<T> & IHasName){
        let itemQuery = this.db.collection(this.collection_name).find<T>({ name: item.name })
        if ((await itemQuery.count()) > 0) {
            return itemQuery;
        }
        return false;
    }

    async create(item: T) {
        if (this.connectedFlag){
            if( await this.itemExistsByName(item) ) return;
            let insertReq = await this.db.collection(this.collection_name).insertOne(item)
            return {
                ...item,
                _id:insertReq.insertedId
            };
        } else {
            throw { error: "not connected" }
        }
    }

    read(query: FilterQuery<T>) {
        if (this.connectedFlag) {
            return this.db.collection(this.collection_name).find<MongoItem<T>>(query);
        } else {
            throw { error: "not connected" }
        }
    }

    async update(item: T) {
        if(this.connectedFlag){
            let db_item = await this.itemExistsByName(item);
            if( !db_item ) return;
            this.db.collection(this.collection_name).updateOne(await db_item.next(),item)
        } else {
            throw { error: "not connected" }
        }
    }

    async delete(item: Partial<T> & IHasName) {
        if(this.connectedFlag) {
            let db_item = await this.itemExistsByName(item);
            if (!db_item) return;
            await this.db.collection(this.collection_name).deleteOne(await db_item.next())
        }
    }

}