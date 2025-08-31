"use client";
import { config } from "@/app/config";
import { Errorinterface } from "@/app/interface/Errorinterface";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function DashboardPage() {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalMembers, setTotalMembers] = useState(0);
  const handlelist = async()=>{
    try {
      
    const url = config.defaulturl + "/api/dashboard/list";
    const res = await axios.get(url);
    if(res.status === 200){
      console.log(res.data)
      setTotalIncome(res.data.sumIncome);
      setTotalOrders(res.data.countOrder);
      setTotalMembers(res.data.countMember);
    }
    } catch (err:unknown) {
      Swal.fire({
        icon: "error",
        title: (err as Errorinterface ).message||"ຜິດພາດ",
        text: "ບໍ່ສາມາດເຂົ້າໄປໄດ້",
      })
    }
  }
  useEffect(()=>{
    handlelist();
  },[])
  return (
    <>
     <div>
      <div>ລາຍໄດ້</div>
      <div>{totalIncome}</div>
     </div>
     <div>
      <div>ລາຍການຊື້</div>
      <div>{totalOrders}</div>
     </div>
     <div>
      <div>ສະມາຊິກ</div>
      <div>{totalMembers}</div>
     </div>
    </>
  );
}
