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

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setIsLoading(true)
        try {
            const url = config.defaulturl + "/api/order/list"
            const response = await axios.get(url)
            if (response.status === 200) {
                setOrders(response.data)
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

    const handleModalShow = () => {
        setShowModal(true)
    }

    const handleModalClose = () => {
        setShowModal(false)
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">ລາຍການສັ່ງຊື້</h1>
                    <button 
                        onClick={handleModalShow}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
                    >
                        
                        ເພີ່ມລາຍການ
                    </button>
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
                                                ${order.status === 'completed' ? 'bg-green-100 text-green-800' : 
                                                  order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                                                  'bg-red-100 text-red-800'}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <button 
                                                onClick={handleModalShow} 
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
                            label='ລະຫັດຕິດຕາມພັດສະດຸ' 
                            className="w-full p-2 border rounded-md"
                        />
                        <Input 
                            label='ບໍລິສັດຂົນສົ່ງ' 
                            className="w-full p-2 border rounded-md"
                        />
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                ເອກະສານການໂອນ
                            </label>
                            <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-blue-500 transition-colors">
                                <i className="text-3xl text-gray-400 fa fa-file"></i>
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 pt-4">
                            <button 
                                onClick={handleModalClose}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                ຍົກເລີກ
                            </button>
                            <button 
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                                ບັນທຶກ
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    )
}