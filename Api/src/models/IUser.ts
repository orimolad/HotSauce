import { Gender } from "./Gender";
import { Hottness } from "./Hottness";
import { SubscriptionLevel } from "./SubscriptionLevel";


export interface IUser { 
    name: string;
    sex?: Gender;
    age: number;
    allergies: string[];
    address:string;
    hottness:Hottness[];
    subscription_level: SubscriptionLevel;
}