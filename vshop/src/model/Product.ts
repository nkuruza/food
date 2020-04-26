import { Shop } from "./Shop";

export interface Product{
    id:number;
    name: string;
    description: string;
    price: number;
    shop:Shop;
}