import { SubscriptionLevel } from "./SubscriptionLevel";


export interface IOrder {
    orderNumber: number;
    name: string;
    address: string;
    subscription_level: SubscriptionLevel;
    user_id: string;
}