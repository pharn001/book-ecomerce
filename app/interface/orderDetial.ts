import { BookInterface } from "./book";
import { OrderInterface } from "./order";

export interface OderDetial{
    id:string;
    qty:number;
    price:number;
    Book:BookInterface;
    Order:OrderInterface;
     amount:number;
}