"use client";

import { config } from "@/app/config";
import { cartInterface } from "@/app/interface/Cart";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

function page() {
  const [cats, setCats] = useState<cartInterface[]>([]);
  const [memberId, setMemberId] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);


  useEffect(() => {
    computeTotalAmount();
  }, [cats]);

  const computeTotalAmount = () => {
    let total = 0;
    for (let i = 0; i < cats.length; i++) {
      total += cats[i].qty * cats[i].book.price;
    }
    setTotalAmount(total);
  };

  const factdataMember = async () => {
    try {
      const url = config.defaulturl + "/api/memeber/info";
      const token = localStorage.getItem(config.hoken_memter);
      const headers = {
        Authorization: `Bearer ${token || ""}`
      };

      const respone = await axios.get(url, { headers });
      if (respone.status === 200) {
        const id = respone.data.id
        setMemberId(id);
    
      }
    } catch (err: any) {
      Swal.fire({
        title: "Error",
        text: err.message || "ບໍ່ສາມາດດຶງຂໍ້ມູນ",
        icon: "error",
      });
    }
  };

  const factdataCart = async () => {
    try {
      const url = config.defaulturl + "/api/cart/list/" + memberId;
      const respone = await axios.get(url);
      if (respone.status === 200) {
        setCats(respone.data);
      }
    } catch (err: any) {
      Swal.fire({
        title: "Error",
        text: err.message || "ບໍ່ສາມາດດຶງຂໍ້ມູນ",
        icon: "error",
      });
    }
  };

  return (
    <div>
      <h2>cart</h2>
      <table>
        <thead>
          <tr>
            <th>ຊື່</th>
            <th>ຈຳນວນ</th>
            <th>ລາຄາ</th>
            <th>ລວມ</th>
          </tr>
        </thead>
        <tbody>
          {cats.map((cart: cartInterface) => (
            <tr key={cart.id}>
              <td>
                <img src={config.defaulturl + "cart.book.image"} alt="" />
              </td>
              <td>{cart.book.name}</td>
              <td>{cart.qty}</td>
              <td>{cart.book.price}</td>
              <td>{(cart.qty * cart.book.price).toLocaleString()}</td>
              <td>
                <button>ສ
                  <i className="fa fa-plus"></i>
                  <i className="fa fa-minus"></i>
                  <i className="fa fa-timer"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h3>ລວມ: {totalAmount.toLocaleString()} ກີບ</h3>
      </div>
    </div>
  );
}

export default page;
