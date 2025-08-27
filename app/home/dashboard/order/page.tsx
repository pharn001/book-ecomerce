"use client"
import { config } from '@/app/config'
import { OrderInterface } from '@/app/interface/order'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Modal from '../../component/modal'
import Input from '../../component/form/input'
import Swal from 'sweetalert2'


export default function OrderListPage() {
    const [orders, setOrders] = useState<OrderInterface[]>([])
    const [showModal, setShowModal] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [traceCode,setTraceCode] = useState('');
    const [express,setExpress] = useState('');
    const [remark,setRemark] = useState('');
    const [order, setOrder] = useState<OrderInterface>();
    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setIsLoading(true)
        try {
            const url = config.defaulturl + "/api/order/list"
            const response = await axios.get(url)
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
        } catch (error) {
            Swal.fire({
                title: 'Error',
                icon: 'error',
                text: 'Failed to load orders. Please try again later.',
                timer: 2000
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handleModalShow = (order: OrderInterface) => {
        setShowModal(true)
        setOrder(order)
    }

    const handleModalClose = () => {
        setShowModal(false)
    }
    const handleCancelOrder = async()=>{
        try {
            const button = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, cancel it!'
            })
            if(button.isConfirmed){
                const url = config.defaulturl + "/api/order/cancel/"+order?.id
                const response = await axios.put(url)
                if(response.status === 200){
                    Swal.fire({
                        title: 'Success',
                        icon: 'success',
                        text: 'Order cancelled successfully.',
                        timer: 2000
                    })
                    fetchData()
                    handleModalClose()
                }
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                icon: 'error',
                text: 'Failed to cancel order. Please try again later.',
                timer: 2000
            })
        }
    }
    const handlePaid = async()=>{
        try {
            const button = await Swal.fire({
                title: 'Are you sure?',
                text: "ເຈົ້າຕ້ອງການຍືນຍັນບໍ່?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, confrim it!'
            })
            if(button.isConfirmed){
                const url = config.defaulturl + "/api/order/paid/"+order?.id
                const response = await axios.put(url)
                if(response.status === 200){
                    Swal.fire({
                        title: 'Success',
                        icon: 'success',
                        text: 'Order cancelled successfully.',
                        timer: 2000
                    })
                    fetchData()
                    handleModalClose()
                }
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                icon: 'error',
                text: 'Failed to cancel order. Please try again later.',
                timer: 2000
            })
        }
    }
    const handleSend=async()=>{
        try {
           
                const url = config.defaulturl + "/api/order/send";
                const response = await axios.put(url,{
                    id:order?.id,
                    traceCode:traceCode,
                    express:express,
                    remark:remark
                })
                if(response.status === 200){
                    Swal.fire({
                        title: 'Success',
                        icon: 'success',
                        text: 'Order cancelled successfully.',
                        timer: 1000
                    })
                    fetchData()
                    handleModalClose()
                }
            
        } catch (error) {
            Swal.fire({
                title: 'Error',
                icon: 'error',
                text: 'Failed to cancel order. Please try again later.',
                timer: 2000
            })
        }
    }
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">ລາຍການສັ່ງຊື້</h1>

                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ວັນທີ</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ຜູ້ຮັບສິນຄ້າ</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ທີ່ຢູ່ຈັດສົ່ງ</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ເບີໂທ</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ສະຖານະ</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ເອກະສານ</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(order.createAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {order.customerName}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {order.customerAddress || '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {order.customerPhone || '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                ${order.status === 'PAID' ? 'bg-green-100 text-green-800' :
                                                    order.status === 'SEND' ? 'bg-yellow-100 text-blue-800' :
                                                        'bg-red-100 text-red-800'}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <button
                                                onClick={(e) => handleModalShow(order)}
                                                type='button'
                                                className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                                            >
                                                <i className="fa fa-file"></i>
                                                ເບິ່ງເອກະສານ
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {showModal && (
                <Modal title='ລາຍການສິນຄ້າ' onClose={handleModalClose}>
                    <div className="space-y-4">
                        <Input
                            onChange={(e)=>setTraceCode(e.target.value)}
                            label='ລະຫັດຕິດຕາມພັດສະດຸ'
                            className="w-full p-2 border rounded-md"
                        />
                        <Input
                            onChange={(e)=>setExpress(e.target.value)}
                            label='ບໍລິສັດຂົນສົ່ງ'
                            className="w-full p-2 border rounded-md"
                        />
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                ເອກະສານການໂອນ
                            </label>
                           <img src={config.defaulturl + '/public/upload/slip/'+ order?.slipImage} alt="slip" width={100} />
                        </div>
                        <div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>ລະຫັດສິນຄ້າ</th>
                                        <th>ຊື່ສິນຄ້າ</th>
                                        <th>ລາຄາ</th>
                                        <th>ຈຳນວນ</th>
                                        <th>ຍອດລວມ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order?.orderDetail.map((item) => (
                                        <tr key={item.id}>
                                            <td className="px-4 py-2 border">{item.Book.isdn}</td>
                                            <td className="px-4 py-2 border">{item.Book.name}</td>
                                            <td className="px-4 py-2 border">{item.price.toLocaleString()}</td>
                                            <td className="px-4 py-2 border">{item.qty}</td>
                                            <td className="px-4 py-2 border">
                                                {(item.price * item.qty).toLocaleString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={4} className="px-4 py-2 border text-right font-bold">ຍອດລວມ:</td>
                                        <td className="px-4 py-2 border">
                                            {order?.sum.toLocaleString()}
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        <div>
                            <label htmlFor="">ຫມາຍເຫດ</label>
                            <textarea onChange={(e)=>setRemark(e.target.value)} name="" id=""></textarea>
                        </div>
                        <div className="flex justify-end gap-2 pt-4">
                            <button
                                onClick={handleCancelOrder}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                ຍົກເລີກ
                            </button>
                            <button
                            onClick={handlePaid}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                                ໄດ້ຮັບເງິນແລ້ວ
                            </button>
                            <button
                            onClick={handleSend}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                                ຈັດສົ່ງແລ້ວ
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    )
}