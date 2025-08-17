"use client"
import { config } from '@/app/config'
import { OrderInterface } from '@/app/interface/order'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

export default function page() {
    const [order, setOrder] = useState<OrderInterface[]>([])
    useEffect(() => {
        fechData()
    }, [])
    const fechData = async () => {
        try {
            const url = config.defaulturl + "/api/member/history";
            const headers = {
                Authorization: "Bearer " + localStorage.getItem(config.hoken_memter)
            }
            const response = await axios.get(url, { headers })
            if (response.status === 200) {
                console.log(response)
                const rows = []
                for (let i = 0; i < response.data.length; i++) {
                    const order = response.data[i];
                    let sum = 0;
                    for (let j = 0; j < order.orderDetail.length; j++) {
                        const orderDetails = order.orderDetail[j];
                        const price = orderDetails.price;
                        const qty = orderDetails.qty;
                        const amount = (price * qty);
                        orderDetails.amount = amount;
                        sum += amount;
                    }
                    order.sum = sum;
                    rows.push(order)
                }

                setOrder(rows);
            }
        } catch (err: any) {
            Swal.fire({
                title: "error",
                icon: "error",
                text: err.message,
                timer: 1500
            })
        }
    }


    return (
        <div>
            <h2> ປະຫວັດການສັ່ງຊື້ </h2>
            <div className="">
                {order.map((orders, index) => (
                    <div key={orders.id ?? index} className='border-2 border-red-800'> 
                        <p>{orders.createAt}</p>
                        <p>{orders.customerName}</p>
                        <p>{orders.customerAddress}</p>
                        <p>{orders.customerPhone}</p>
                        <p>{orders.express}</p>
                        <p>{orders.remark}</p>
                        <p>{orders.trackCode}</p>
                        <div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>ລະຫັດສິນຄ້າ</th>
                                        <th>ຊື່ສິນຄ້າ</th>
                                        <th>ຈຳນວນ</th>
                                        <th>ລາຄາ</th>
                                        <th>ລາຄາລວມ</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.orderDetail.map((orderDetails, inx) => (
                                        <tr key={orderDetails.id ?? inx}>
                                            <td>{orderDetails.Book.isdn}</td>
                                            <td>{orderDetails.Book.name}</td>
                                            <td>{orderDetails.price}</td>
                                            <td>{orderDetails.qty}</td>
                                            <td>{orderDetails.amount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={4}>ລວມຍອດ</td>
                                        <td >{orders.sum}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
