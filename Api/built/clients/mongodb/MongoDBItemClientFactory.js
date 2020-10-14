"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDbItemClientFactory = void 0;
var assert = require("assert");
var mongodb_1 = require("mongodb");
var MongoDbItemClientFactory = /** @class */ (function () {
    function MongoDbItemClientFactory(collectionName) {
        this.collection_name = collectionName;
        // Connection URL
        this.url = 'mongodb://localhost:27017';
        // Database Name
        this.dbName = 'hot';
        // Create a new MongoClient
        this.client = new mongodb_1.MongoClient(this.url, { useUnifiedTopology: true });
        this.connectedFlag = false;
        this.isConnecting = false;
    }
    MongoDbItemClientFactory.prototype.build = function () {
        var _this = this;
        if (!this.isConnecting) {
            this.isConnecting = true;
            return new Promise((function (res, rej) {
                _this.client.connect((function (err) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        assert.equal(null, err);
                        console.log("Connected successfully to server");
                        this.db = this.client.db(this.dbName);
                        this.connectedFlag = true;
                        //resolves the promise
                        res();
                        return [2 /*return*/];
                    });
                }); }).bind(_this));
            }).bind(this));
        }
        else {
            throw { error: "already trying to connect" };
        }
    };
    MongoDbItemClientFactory.prototype.dispose = function () {
        this.client.close();
        this.client = new mongodb_1.MongoClient(this.url);
        this.isConnecting = false;
        this.connectedFlag = false;
    };
    //Returns false if the item doesn't exist
    //Returns the query if the item does exist
    MongoDbItemClientFactory.prototype.itemExistsByName = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var itemQuery;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        itemQuery = this.db.collection(this.collection_name).find({ name: item.name });
                        return [4 /*yield*/, itemQuery.count()];
                    case 1:
                        if ((_a.sent()) > 0) {
                            return [2 /*return*/, itemQuery];
                        }
                        return [2 /*return*/, false];
                }
            });
        });
    };
    MongoDbItemClientFactory.prototype.create = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var insertReq;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.connectedFlag) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.itemExistsByName(item)];
                    case 1:
                        if (_a.sent())
                            return [2 /*return*/];
                        return [4 /*yield*/, this.db.collection(this.collection_name).insertOne(item)];
                    case 2:
                        insertReq = _a.sent();
                        return [2 /*return*/, __assign(__assign({}, item), { _id: insertReq.insertedId })];
                    case 3: throw { error: "not connected" };
                }
            });
        });
    };
    MongoDbItemClientFactory.prototype.read = function (query) {
        if (this.connectedFlag) {
            return this.db.collection(this.collection_name).find(query);
        }
        else {
            throw { error: "not connected" };
        }
    };
    MongoDbItemClientFactory.prototype.update = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var db_item, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.connectedFlag) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.itemExistsByName(item)];
                    case 1:
                        db_item = _c.sent();
                        if (!db_item)
                            return [2 /*return*/];
                        _b = (_a = this.db.collection(this.collection_name)).updateOne;
                        return [4 /*yield*/, db_item.next()];
                    case 2:
                        _b.apply(_a, [_c.sent(), { $set: item }, { upsert: true }]);
                        return [3 /*break*/, 4];
                    case 3: throw { error: "not connected" };
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MongoDbItemClientFactory.prototype.delete = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var db_item, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.connectedFlag) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.itemExistsByName(item)];
                    case 1:
                        db_item = _c.sent();
                        if (!db_item)
                            return [2 /*return*/];
                        _b = (_a = this.db.collection(this.collection_name)).deleteOne;
                        return [4 /*yield*/, db_item.next()];
                    case 2: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                    case 3:
                        _c.sent();
                        _c.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return MongoDbItemClientFactory;
}());
exports.MongoDbItemClientFactory = MongoDbItemClientFactory;
