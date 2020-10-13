import { Hottness } from "./Hottness";

export interface IItem {
    price:number;
    name:string;
    hot:Hottness;
    description?:string;
}