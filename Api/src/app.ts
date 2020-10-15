import {  Db } from 'mongodb';
import { IUser } from './models/IUser';
import { MongoDbItemClientFactory } from './clients/mongodb/MongoDBItemClientFactory';
import { Gender } from './models/Gender';
import { Hottness } from './models/Hottness';
import { SubscriptionLevel } from './models/SubscriptionLevel';
import { IItem } from './models/IItem';
import { SSL_OP_NO_TLSv1_1 } from 'constants';
import { IOrder } from './models/IOrder';
import { IOrderItem } from './models/IORderITem';
import { getuid } from 'process';
import express from 'express';
import { read } from 'fs';
import { create } from 'domain';
import { EndpointFactory } from './endpoint/EndpointFactory';
import cors from "cors";
const app = express();
const port = 3000;

// function find
// Use connect method to connect to the Server
const startApp = async() => {
    app.use(express.json())
    app.use(cors());
    let userEndpoint = new EndpointFactory<IUser>("user");
    await userEndpoint.registerEndpoint(app);

    let itemEndpoint = new EndpointFactory<IItem>("item");
    await itemEndpoint.registerEndpoint(app);

    let orderEndpoint = new EndpointFactory<IOrder>("order");
    await orderEndpoint.registerEndpoint(app);

    let orderItemEndpoint = new EndpointFactory<IOrderItem>("orderItem");
    await orderItemEndpoint.registerEndpoint(app);

    //start server and tell it to listen
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })
}

startApp()


// orderClient.build().then(async () =>{
//     await orderClient.create({
//         orderNumber: 1,
//         name: 'Ori Molad',
//         address: '71 amberwood',
//         subscription_level: SubscriptionLevel.GOLD,
//         user_id: "1"
//     })
//     await (orderClient.read({})).forEach(console.log)
//     orderClient.dispose();
// })

// orderItemClient.build().then(async () => {
//    await orderItemClient.create({
//         orderNumber: 1,
//         item_id: "Mango Tango",
//         itemPrice: 15.95,
//         user_id: "1",
//         name: getuid().toString()
//     })
//     await (orderItemClient.read({}).forEach(console.log))
//     var res = await orderItemClient.read({}).next()
//     await orderItemClient.delete(res)
//     orderItemClient.dispose();

// })


// userClient.build().then(async () => {
//     await userClient.create({
//         name: "Ori Molad",
//         sex: Gender.MALE,
//         age: 28,
//         allergies: [],
//         address: '71 amberwood lane',
//         hottness: Hottness.Hot,
//         subscription_level: SubscriptionLevel.GOLD
//     })
//     await (userClient.read({ name: "Ori Molad" })).forEach(console.log)

//     userClient.dispose()
// })

// itemClient.build().then(async ()=>{
//     await itemClient.create({
//         name: "Mango Tango",
//         hot: Hottness.Medium,
//         price: 14.95,
//     })

//     await (itemClient.read({})).forEach(console.log)
//     await itemClient.delete({ name: "Mango Tango" })
//     itemClient.dispose();
// })




