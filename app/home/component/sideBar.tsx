"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { config } from "@/app/config";
import axios from "axios";
import { useRouter } from "next/navigation";
import Navigation from "./Navigation";


export default function SideBar() {
  const [name, setName] = useState<string>("");
  const [level, setLevel] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    factData();
  }, []);

  const router = useRouter();
  
  const factData = async () => {
    try {
      setIsLoading(true);
      const url = config.defaulturl + "/api/admin/info";
      const token = localStorage.getItem(config.hoken);
      const headers = {
        Authorization:  `Bearer ${token}`,
      };
      const response = await axios.get(url, { headers });
      
      if (response.data.name !== undefined) {
        const data = response.data;
        setName(data.name);
        setLevel(data.level);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message,
        confirmButtonText: "OK",
        background: '#1f2937',
        color: '#fff',
        confirmButtonColor: '#3b82f6',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "ອອກຈາກລະບົບ",
      text: "ແນ່ໃຈບໍ່ທີ່ຈະອອກ?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, log out!",
      cancelButtonText: "No, cancel!",
      background: '#1f2937',
      color: '#fff',
      confirmButtonColor: '#3b82f6',
      cancelButtonColor: '#6b7280',
    });

    if (result.isConfirmed) {
      localStorage.removeItem(config.hoken);
      await Swal.fire({
        title: 'Logged Out!',
        text: 'You have been successfully logged out.',
        icon: 'success',
        confirmButtonColor: '#3b82f6',
        background: '#1f2937',
        color: '#fff',
        timer: 1500,
        timerProgressBar: true,
      });
      router.push("/sign-in");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-800 text-white w-64 shadow-xl">
      {/* Header Section */}
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-blue-400 mb-4 flex items-center">
          <i className="fas fa-book-open mr-2"></i>
          Book Office
        </h1>
        
        {isLoading ? (
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2"></div>
          </div>
        ) : (
          <>
            <div className="flex items-center mb-4 p-3 bg-gray-700 rounded-lg">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-white">
                  <i className="fas fa-user text-lg"></i>
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-700"></span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{name}</p>
                <p className="text-xs text-gray-400">{level}</p>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Link 
                href="/home/dashboard/edit-profile" 
                className="button1 flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium flex items-center justify-center transition-all duration-300 transform hover:scale-105"
              >
                <i className="fas fa-edit mr-2"></i>
                ແກ້ໄຂ
              </Link>
              <button 
                onClick={handleLogout}
                className="button2 flex-1 py-2 px-3 bg-gray-700 hover:bg-red-600 text-white rounded-lg text-sm font-medium flex items-center justify-center transition-all duration-300 transform hover:scale-105"
              >
                <i className="fas fa-sign-out-alt mr-2"></i>
                ອອກຈາກລະບົບ
              </button>
            </div>
          </>
        )}
      </div>
      
      {/* Navigation Section  */}
      <div className="">
        <Navigation />
      </div>
      
      {/* Footer Section */}
      <div className="p-4 border-t border-gray-700 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Book Office. All rights reserved.
      </div>
    </div>
  );
}