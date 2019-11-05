import { OrderLine } from "./OrderLine";
import { User } from "./User";
import { Shop } from "./Shop";

export interface Order{
    id:number,
    orderLines:OrderLine[],
    dateCreated:Date,
    dateCompleted: Date,
    customer: User,
    shop: Shop
}