import { Product } from "./Product";

export interface OrderLine{
    id:number,
    product: Product,
    unitPrice: number,
    qty: number
}