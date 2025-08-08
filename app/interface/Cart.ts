import { BookInterface } from "./book";

export interface cartInterface{
    id:string;
    member_id:string; 
    book_id:string;
    qty:number;
    book:BookInterface;
}