"use client"
import { config } from '@/app/config';
import { Errorinterface } from '@/app/interface/Errorinterface';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';


export default function Page() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    // await new Promise(resolve => setTimeout(resolve, 1500));
    try {
      if (formData.password && formData.password !== formData.confirmPassword) {
      Swal.fire({
        title: 'ຜິດພາດ!',
        text: 'ລະຫັດຜ່ານບໍ່ກົງກັນ',
        icon: 'error',
        background: '#1e293b',
        color: '#fff',
        confirmButtonColor: '#6366f1',
        iconColor: '#f87171',
      });
      setIsSubmitting(false);
      return ;
    }
     const headers ={
        'Authorization': 'Bearer ' + localStorage.getItem(config.hoken)
      }  
    const url = config.defaulturl + `/api/admin/update`
    const response = await axios.put(url,formData,{headers})
    if( response.status == 200) {
        Swal.fire({
        title: 'ສຳເລັດ!',
        text: 'ແກ້ໄຂຂໍ້ມູນສຳເລັດ',
        icon: 'success',
        background: '#1e293b',
        color: '#fff',
        confirmButtonColor: '#6366f1',
        iconColor: '#a7f3d0',
        showClass: {
          popup: 'animate_animated animate_fadeInDown'
        },
        hideClass: {
          popup: 'animate_animated animate_fadeOutUp'
        }
      });
    }
    
    console.log(formData)

    setIsSubmitting(false);
    } catch (err: unknown) {
      Swal.fire({
        title: 'ຜິດພາດ!',
        text: 'ບໍ່ສາມາດປ່ຽນແປງໄດ້ ກະລຸນາລອງໃໝ່' +  (err as Errorinterface),
        icon: 'error',
        background: '#1e293b',
        color: '#fff',
        confirmButtonColor: '#6366f1',
        iconColor: '#f87171',
      })
    }
    
  };

  useEffect(() =>{
    fetchUserData()
  },[])
  const  fetchUserData = async () =>{
    try {
      const url = config.defaulturl + `/api/admin/info`
      const headers ={
        'Authorization': 'Bearer ' + localStorage.getItem(config.hoken)
      }  
      const response = await axios.get(url,{headers});
      if(response.status === 200){
        const userData = response.data;
        setFormData({
          name: userData.name || '',
          username: userData.username || '',
          password: '',
          confirmPassword: ''
        })
      }
    } catch (err:unknown) {
      Swal.fire({
        title:'ຜິດພາດ!',
        text: (err as Errorinterface).message,
        icon: 'error',
        timer: 3000,
      })
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-lg w-full bg-slate-800/50 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-slate-700/50 animate_animated animate_fadeIn">
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-indigo-500/20 mb-4">
           
              <i className="fa-regular fa-user text-indigo-400 h-8 w-8 text-3xl"></i>
            </div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300 mb-2">
              ແກ້ໄຂໂປຣໄຟລ໌
            </h1>
            <p className="text-slate-400">ປ່ຽນແປງຂໍ້ມູນສ່ວນຕົວຂອງທ່ານ</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <label htmlFor="name" className="block text-sm font-medium text-slate-300">
                ຊື່
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="ປ້ອນຊື່ຂອງທ່ານ"
                  className="block w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                  value={formData.name}
                  onChange={handleChange}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <i className="fa fa-user h-5 w-5 text-slate-400" ></i>
                 
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="username" className="block text-sm font-medium text-slate-300">
                ຊື່ຜູ້ໃຊ້
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="ປ້ອນຊື່ຜູ້ໃຊ້"
                  className="block w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                  value={formData.username}
                  onChange={handleChange}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                 <i className="fa-solid fa-address-card w-5 h-5 text-slate-400"></i>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                ລະຫັດຜ່ານ
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="ປ້ອນລະຫັດຜ່ານ"
                  className="block w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                  value={formData.password}
                  onChange={handleChange}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                 <i className="fa-solid fa-lock w-5 h-5 text-slate-400"></i>
                </div>
              </div>
              <p className="mt-1 text-xs text-slate-500">ຖ້າບໍ່ຕ້ອງການປ່ຽນ ບໍ່ຕ້ອງປ້ອນ</p>
            </div>

            <div className="space-y-1">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300">
                ຢືນຢັນລະຫັດຜ່ານ
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="ປ້ອນລະຫັດຜ່ານອີກຄັ້ງ"
                  className="block w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                 <i className="fa-solid fa-check w-5  h-5 text-slate-400"></i>
                </div>
              </div>
              <p className="mt-1 text-xs text-slate-500">ຖ້າບໍ່ຕ້ອງການປ່ຽນ ບໍ່ຕ້ອງປ້ອນ</p>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    ກຳລັງບັນທຶກ...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                    </svg>
                    ບັນທຶກການປ່ຽນແປງ
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
