"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var EndpointFactory_1 = require("./endpoint/EndpointFactory");
var cors_1 = __importDefault(require("cors"));
var app = express_1.default();
var port = 3000;
// function find
// Use connect method to connect to the Server
var startApp = function () { return __awaiter(void 0, void 0, void 0, function () {
    var userEndpoint, itemEndpoint, orderEndpoint, orderItemEndpoint;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app.use(express_1.default.json());
                app.use(cors_1.default());
                userEndpoint = new EndpointFactory_1.EndpointFactory("user");
                return [4 /*yield*/, userEndpoint.registerEndpoint(app)];
            case 1:
                _a.sent();
                itemEndpoint = new EndpointFactory_1.EndpointFactory("item");
                return [4 /*yield*/, itemEndpoint.registerEndpoint(app)];
            case 2:
                _a.sent();
                orderEndpoint = new EndpointFactory_1.EndpointFactory("order");
                return [4 /*yield*/, orderEndpoint.registerEndpoint(app)];
            case 3:
                _a.sent();
                orderItemEndpoint = new EndpointFactory_1.EndpointFactory("orderItem");
                return [4 /*yield*/, orderItemEndpoint.registerEndpoint(app)];
            case 4:
                _a.sent();
                //start server and tell it to listen
                app.listen(port, function () {
                    console.log("Example app listening at http://localhost:" + port);
                });
                return [2 /*return*/];
        }
    });
}); };
startApp();
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
