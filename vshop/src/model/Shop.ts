import { User } from "./User";
import { Product } from "./Product";

export interface Shop {
    id: number,
    name: string,
    address: number,
    lon: number,
    lat: number,
    owner: User,
    products: Product[]
}