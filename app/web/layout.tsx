"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { config } from "../config";
import axios from "axios";
import Swal from "sweetalert2";
import Button from "../home/component/form/button";
import { Errorinterface } from "../interface/Errorinterface";

export default function WebMemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [name, setName] = useState("");

  const fetchData = async () => {
    try {
      const tokenKey = config.hoken_memter;
      const token = localStorage.getItem(tokenKey);
      
      if (!token) return;
      
      const url = config.defaulturl + "/api/member/info";
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      
      const response = await axios.get(url, { headers });
      
      if (response.status === 200) {
        setName(response.data.username);
      }
    } catch (err : unknown) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: (err as Errorinterface ).message||"Failed to fetch member info!",
        confirmButtonText: "OK",
        background: "#f0f9ff",
        color: "#0369a1",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "ຢືນຢັນການອອກ",
      text: "ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການອອກ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0369a1",
      cancelButtonColor: "#94a3b8",
      confirmButtonText: "Yes, ອອກ",
      cancelButtonText: "No, ບໍ່",
      background: "#f0f9ff",
      color: "#0369a1",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem(config.hoken_memter);
        window.location.href = "/web/";
      }
    });
  };

  return (
    <>
      <div className="w-full h-16 bg-gradient-to-r from-blue-600 to-blue-800 px-4 flex items-center justify-between shadow-md">
        <div>
          <h2 className="text-3xl font-bold text-white">
            📚 ຮ້ານຫນັງສື ອອນລາຍ
          </h2>
          <h2 className="text-xl font-semibold text-blue-100">
            ຄວາມຮູ້ໄຫມ່ໃກ້ສັນ {name}
          </h2>
        </div>
        
        <div className="flex flex-row gap-4 items-center">
          <Link 
            href="/web" 
            className="text-white hover:text-blue-200 transition-colors px-3 py-1 rounded hover:bg-blue-700"
          >
            <i className="fa fa-home mr-1"></i>
            ໜ້າຫຼັກ
          </Link>
          <Link href="/web/member/history" className="text-white">
          <i className="fa fa-file-alt"></i>
          ຕິດຕາມກັນສັ່ງຊື້
          </Link>
          
          {name === "" ? (
            <>
              <Link 
                href="/web/member/register" 
                className="text-white hover:text-blue-200 transition-colors px-3 py-1 rounded hover:bg-blue-700"
              >
                <i className="fa fa-user-plus mr-1"></i> ສະມັກສະມາຊິກ
              </Link>
              <Link 
                href="/web/member/sign-in" 
                className="bg-white text-blue-600 hover:bg-blue-50 transition-colors px-3 py-1 rounded font-medium"
              >
                <i className="fa fa-sign-in mr-1"></i> ລ໋ອກອິນ
              </Link>
            </>
          ) : (
            <Button
              onClick={handleLogout}
              label="ອອກລະບົບ"
              icon="fa-sign-out"
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors"
            />
          )}
        </div>
      </div>
      
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {children}
      </div>
    </>
  );
}