import { MemberInterface } from "./member";
import { OderDetial } from "./orderDetial";

export interface OrderInterface{
    id:string;
    memeber:MemberInterface;
    status:string;
    createAt:string;
    slipImage:string;
    trackcode:string;
    remark:string;
    customerName:string;
    customerAddress:string;
    customerPhone:string;
    express:string;
    orderDetail:OderDetial[];   
    sum:number;
}