"use client"
import React, { useEffect, useState } from 'react';
import { config } from '@/app/config';
import { OrderInterface } from '@/app/interface/order';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Errorinterface } from '@/app/interface/Errorinterface';

export default function OrderHistoryPage() {
    const [orders, setOrders] = useState<OrderInterface[]>([]);

    const [expandedOrder, setExpandedOrder] = useState<number | null>(null);
    
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const url = config.defaulturl + "/api/member/history";
            const headers = {
                Authorization: "Bearer " + localStorage.getItem(config.hoken_memter)
            }
            const response = await axios.get(url, { headers });
            
            if (response.status === 200) {
                const processedOrders = response.data.map((order: OrderInterface) => {
                    const sum = order.orderDetail.reduce((total, detail) => {
                        const amount = detail.price * detail.qty;
                        detail.amount = amount;
                        return total + amount;
                    }, 0);
                    
                    return { ...order, sum };
                });

                setOrders(processedOrders);
            }
        } catch (err: unknown) {
            Swal.fire({
                title: "Error",
                icon: "error",
                text: (err as Errorinterface).message,
                timer: 1500
            })
        }
    }

    const toggleOrder = (index: number) => {
        setExpandedOrder(expandedOrder === index ? null : index);
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <header className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-indigo-800 mb-3">ປະຫວັດການສັ່ງຊື້</h1>
                    <div className="w-24 h-1 bg-indigo-500 mx-auto rounded-full"></div>
                    <p className="mt-4 text-gray-600 max-w-md mx-auto">
                        ການສັ່ງຊື້ທັງໝົດຂອງທ່ານສາມາດເບິ່ງໄດ້ຢູ່ທີ່ນີ້
                    </p>
                </header>

                <div className="space-y-6">
                    {orders.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-xl shadow-md">
                            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4"></div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">ບໍ່ມີປະຫວັດການສັ່ງຊື້</h3>
                            <p className="text-gray-500">ທ່ານຍັງບໍ່ໄດ້ມີການສັ່ງຊື້ໃດໆໃນລະບົບ</p>
                        </div>
                    ) : (
                        orders?.map((order, index) => (
                            <div 
                                key={order.id ?? index} 
                                className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 ${expandedOrder === index ? 'ring-2 ring-indigo-500' : ''}`}
                            >
                                <div 
                                    className="p-5 cursor-pointer flex flex-wrap items-center justify-between gap-4"
                                    onClick={() => toggleOrder(index)}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="bg-indigo-100 p-3 rounded-lg">
                                          <i className="fa-solid fa-bag-shopping text-xl"></i>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <h3 className="text-lg font-semibold text-gray-800">ສັ່ງຊື້ເມື່ອ: {new Date(order.createAt).toLocaleDateString()}</h3>
                                                <span className={`px-2 py-1 
                                                    ${order.status === 'PAID'? 'bg-green-100 text-green-800'
                                                    :order.status === 'SEND' ? 'bg-indigo-100 text-indigo-800':'bg-red-200 text-red-800' } text-xs font-medium rounded-full`}>
                                                    #{order.trackcode || 'ກຳລັງກວດສອບ'} - {order.status}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600 mt-1">ລູກຄ້າ: {order.customerName}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <p className="text-sm text-gray-600">ຍອດລວມ</p>
                                            <p className="text-xl font-bold text-indigo-700">{order.sum?.toLocaleString()} ກີບ</p>
                                        </div>
                                        <div className={`transform transition-transform duration-300  ${expandedOrder === index ? 'rotate-180' : ''}`}>
                                            <i className="fa-solid fa-circle-down "></i>
                                        </div>
                                    </div>
                                </div>
                                
                                <div 
                                    className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedOrder === index ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
                                >
                                    <div className="border-t border-gray-100">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                                            <div>
                                                <h4 className="text-md font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                                   <i className="fa fa-user"></i>
                                                    ຂໍ້ມູນລູກຄ້າ
                                                </h4>
                                                <div className="space-y-2 pl-7">
                                                    <p className="text-gray-600"><span className="font-medium text-gray-800">ຊື່:</span> {order.customerName}</p>
                                                    <p className="text-gray-600"><span className="font-medium text-gray-800">ທີ່ຢູ່:</span> {order.customerAddress}</p>
                                                    <p className="text-gray-600"><span className="font-medium text-gray-800">ເບີໂທ:</span> {order.customerPhone}</p>
                                                </div>
                                            </div>
                                            
                                            <div>
                                                <h4 className="text-md font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                                 <i className="fa-solid fa-bag-shopping"></i>
                                                    ຂໍ້ມູນການຈັດສົ່ງ
                                                </h4>
                                                <div className="space-y-2 pl-7">
                                                    <p className="text-gray-600"><span className="font-medium text-gray-800">ບໍລິສັດຂົນສົ່ງ:</span>{order.trackcode} {order.express}</p>
                                                    <p className="text-gray-600"><span className="font-medium text-gray-800">ຫມາຍເຫດ:</span> {order.remark || '-'}</p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="px-6 pb-6">
                                            <h4 className="text-md font-semibold text-gray-700 mb-4 flex items-center gap-2">
                                                <i className="fa-solid fa-bag-shopping"></i>
                                                ລາຍລະອຽດສິນຄ້າ
                                            </h4>
                                            
                                            <div className="overflow-x-auto rounded-lg border border-gray-200">
                                                <table className="min-w-full divide-y divide-gray-200">
                                                    <thead className="bg-gray-50">
                                                        <tr>
                                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ລະຫັດ</th>
                                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ຊື່ສິນຄ້າ</th>
                                                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ລາຄາ</th>
                                                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ຈຳນວນ</th>
                                                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ລວມ</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="bg-white divide-y divide-gray-200">
                                                        {order?.orderDetail?.map((detail, idx) => (
                                                            <tr key={detail.id ?? idx} className="hover:bg-gray-50 transition-colors">
                                                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800">{detail.Book.isdn}</td>
                                                                <td className="px-4 py-3 text-sm text-gray-600">{detail.Book.name}</td>
                                                                <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-600">{detail.price.toLocaleString()} ກີບ</td>
                                                                <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-600">{detail.qty}</td>
                                                                <td className="px-4 py-3 whitespace-nowrap text-sm text-right font-medium text-indigo-700">{(detail.amount || 0).toLocaleString()} ກີບ</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                    <tfoot className="bg-gray-50 border-t border-gray-200">
                                                        <tr>
                                                            <td colSpan={4} className="px-4 py-3 text-right text-sm font-medium text-gray-700">ຍອດລວມທັງໝົດ</td>
                                                            <td className="px-4 py-3 text-right text-lg font-bold text-indigo-700">{order.sum?.toLocaleString()} ກີບ</td>
                                                        </tr>
                                                    </tfoot>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                
                <footer className="mt-12 text-center text-gray-500 text-sm">
                    <p>© 2025 ລະບົບສັ່ງຊື້ສິນຄ້າ. ສະຫງວນລິຂະສິດ.</p>
                </footer>
            </div>
        </div>
    );
}