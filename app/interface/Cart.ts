import { BookInterface } from "./book";

export interface cartInterface{
    id:number;
    member_id:string; 
    book_id:string;
    qty:number;
    book:BookInterface;
}