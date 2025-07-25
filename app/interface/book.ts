export interface BookInterface{
id :string;
price: number;  
name: string;  
description:string;
isdn:string;
createdAt: Date;
image?: File | string; // Optional image URL
}