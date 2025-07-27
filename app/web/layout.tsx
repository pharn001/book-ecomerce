"use client";
import Link from "next/link";

import { useState, useEffect } from "react";
import { config } from "../config";
import axios from "axios";
import Swal from "sweetalert2";
import Button from "../home/component/form/button";

export default function webMemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [name, setName] = useState("");
  const factdata = async () => {
    try {
      const tokenKey = config.hoken_memter;
      const token = localStorage.getItem(tokenKey);
      if (!token)return;
        const url = config.defaulturl + "/api/member/info";
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const reponse = await axios.get(url, { headers });
        if (reponse.status === 200) {
          setName(reponse.data.name);
        }
      
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to fetch member info!",
        confirmButtonText: "OK",
      });
    }
  };
  useEffect(() => {
    factdata();
  }, []);
  const handleLogout = () => {
    Swal.fire({
      title: "ຢືນຢັນການອອກ",
      text: "ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການອອກ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, ອອກ",
      cancelButtonText: "No, ບໍ່",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem(config.hoken_memter);
        window.location.href = "/web/";
      }
    });
  };
  return (
    <>
      <div className="w-full h-16 bg-gray-600 px-4 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 ">
            📚 ຮ້ານຫນັງສື ອອນລາຍ
          </h2>
          <h2 className="text-xl font-bold text-gray-900 ">
            ຄວາມຮູ້ໄຫມ່ໃກ້ສັນ {name}
          </h2>
        </div>
        <div className="flex flex-row gap-2 bg-gray-600 ">
          <Link href="/web">
            <i className="fa fa-home mr-1"></i>
            ໜ້າຫຼັກ
          </Link>
          {name === "" ? (
            <>
              <Link href="/web/member/register">
                <i className="fa fa-user-plus "></i> ສະມັກສະມາຊິກ
              </Link>
              <Link href="/web/member/sign-in">
                <i className="fa fa-clock "></i> ລ໋ອກອິນ
              </Link>
            </>
          ) : (
            <>
              <Button
                onClick={handleLogout}
                label="ອອກລະບົບ"
                icon="fa-sign-out"
                className="text-red-500"
              />
            </>
          )}
        </div>
      </div>
      <div className="">{children}</div>
    </>
  );
}
