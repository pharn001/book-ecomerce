"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { config } from "@/app/config";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SideBar() {
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  useEffect(() => {
    factData();
  }, []);
  const router = useRouter();
  const factData = async () => {
    try {
      const url = config.defaulturl + "/api/admin/info";
      const token = localStorage.getItem(config.hoken);
      const headers = {
        Authorization: `Bearer ${token}`,
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
      });
    }
  };
  const handleLogout = async () =>{
    const button = await Swal.fire({
      title: "ອອກຈາກລະບົບ",
      text: "ແນ່ໃຈບໍ່ທີ່ຈະອອກ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, log out!",
      cancelButtonText: "No, cancel!",
    })

    if(button.isConfirmed){
      localStorage.removeItem(config.hoken);
      router.push("/sign-in");
    }
  }
  return (
    <div>
      <div className="header">
        <h1>Book office</h1>

        <p>
          <i className="fa fa-user mr-2"></i>
          {name} :{level}
        </p>
        <div className="btn-group">
          <Link href="/edit" className="button1">
            {" "}
            <i className="fa fa-edit"> </i>ແກ້ໄຂ
          </Link>
          <div >
            <button className="button2" onClick={handleLogout}>
              <i className="fa fa-times"></i> ອອກຈາກລະບົບ
            </button>
          </div>
        </div>
      </div>
      <div className="body">
        <Link className="item" href="/dashboard">
          <i className="fa-solid fa-house"></i>
          bashboard
        </Link>
        <Link className="item" href="/book">
          <i className="fa-solid fa-book-tanakh"></i>
          ໜັງສື
        </Link>
        <Link className="item" href="/order">
          <i className="fa-solid fa-list"></i>
          ລາຍການ
        </Link>
        <Link className="item" href="/admin">
          <i className="fa fa-user-cog"></i>
          ຜູ້ໃຊ້ລະບົບ
        </Link>
      </div>
    </div>
  );
}

function useEfect() {
  throw new Error("Function not implemented.");
}
