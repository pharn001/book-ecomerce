import { MemberInterface } from "./member";
import { OderDetial } from "./orderDetial";

export interface OrderInterface{
    id:string;
    memeber:MemberInterface;
    status:string;
    createAt:string;
    slipimage:string;
    trackCode:string;
    remark:string;
    customerName:string;
    customerAddress:string;
    customerPhone:string;
    express:string;
    orderDetail:OderDetial[];   
    sum:number;
}