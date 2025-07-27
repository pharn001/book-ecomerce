"use client"
import Button from '@/app/home/component/form/button'
import Input from '@/app/home/component/form/input'
import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { config } from '@/app/config'
import axios from 'axios'

function RegisterPage() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        phone: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (formData.password !== formData.confirmPassword) {
                Swal.fire({
                    title: 'ຂໍອະໄພ',
                    text: 'ລະຫັດຜ່ານ ແລະ ລະຫັດຍືນ ບໍ່ຕົງກັນ',
                    icon: 'error',
                });
                setLoading(false);
                return;
            }

            const url = config.defaulturl + '/api/member/register';
            const payload = {
                phone: formData.phone,
                password: formData.password,
                username: formData.username
            }

            const response = await axios.post(url, payload);
            if (response.status === 200) {
                Swal.fire({
                    title: 'ສຳເລັດ',
                    text: 'ທ່ານໄດ້ລົງທະບຽນແລ້ວ',
                    icon: 'success',
                });
                setFormData({
                    phone: '',
                    username: '',
                    password: '',
                    confirmPassword: ''
                });
                setLoading(false);
            }
        } catch (err: any) {
            Swal.fire({
                title: 'ຂໍອະໄພ',
                text: err.message,
                icon: 'error',
            });
            setLoading(false);
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-xl">
            <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">ລົງທະບຽນ</h1>
            <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                    <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        label="ເບີໂທ"
                        placeholder="ປ້ອນເບີໂທ"
                        required
                    />
                    
                    <Input
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        label="Username"
                        placeholder="ປ້ອນ username"
                        required
                    />
                    
                    <Input
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        label="ລະຫັດຜ່ານ"
                        required
                    />
                    
                    <Input
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        label="ຢືນຢັນລະຫັດຜ່ານ"
                        required
                    />
                    
                    <div className="pt-4">
                        <Button
                            label={loading ? 'ກຳລັງດຳເນີນການ...' : 'ບັນທຶກ'}
                            disabled={loading}
                            type="submit"
                            className="w-full"
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default RegisterPage