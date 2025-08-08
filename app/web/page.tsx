"use client";
import { config } from "@/app/config";
import { BookInterface } from "@/app/interface/book";
import { useEffect, useState } from "react";
import { cartInterface } from "../interface/Cart";
import Swal from "sweetalert2";
import axios from "axios";
import Link from "next/link";
import { usedatabook } from "../home/dashboard/book/hook/usedatabook";
export default function Home() {
  const { books, loading ,factdata} = usedatabook();
  const [token, setToken] = useState("");
  const [meberId, setMemberId] = useState("");
  const [cats, setCats] = useState<cartInterface[]>([]);
  const [qtyCart, setQtyCart] = useState(0); 
  useEffect(() => {
    readToken();
    factdata();
    if (meberId !== "") {
      fectDataCart();
    }
  }, [meberId]);
  const readToken = async () => {
    const token = localStorage.getItem(config.hoken_memter) || "";
    setToken(token);
    try {
      const url = config.defaulturl + "/api/member/info";
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(url, { headers });
      if (response.status === 200) {
        setMemberId(response.data.id);
      } else {
        Swal.fire({
          title: "Error",
          text: "ບໍ່ສາມາດດຶງຂໍ້ມູນ",
          icon: "error",
        });
      }
    } catch (error: any) {
      Swal.fire({
        title: "Error",
        text: error.message || "ບໍ່ສາມາດດຶງຂໍ້ມູນ",
        icon: "error",
      });
    }
  };

  const fectDataCart = async () => {
    try {
      if (token !== "") {
        const url = config.defaulturl + "/api/cart/list/" + meberId;
        const response = await axios.get(url);
        if (response.status === 200) {
          setCats(response.data);
          let total = 0;

          response.data.forEach((item: cartInterface) => {
            total += item.qty;
          });
          // or
          // for (let i = 0; i < response.data.length; i++) {
          //   total += response.data[i].qty;
          // }
          setQtyCart(total);
        } else {
          Swal.fire({
            title: "Error",
            text: "ບໍ່ສາມາດດຶງຂໍ້ມູນກະຕ່າ",
            icon: "error",
          });
        }
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "ບໍ່ສາມາດດຶງຂໍ້ມູນກະຕ່າ",
        icon: "error",
      });
    }
  };
  const handleaddCart = async (bookId: string) => {
    try {
      const url = config.defaulturl + "/api/cart/add";
      const payload = {
        memberId: meberId,
        bookId: bookId,
      };
      const response = await axios.post(url, payload);
      if (response.status === 200) {
        fectDataCart();
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "ບໍ່ສາມາດດຶງຂໍ້ມູນກະຕ່າ",
        icon: "error",
      });
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex flex-col sm:flex-row justify-end items-center mb-6">
        <div className="text-right">ສິນຄ້າໃນກະຕ່າ =​ {cats.length}</div>
        <div className="text-right">ຈຳນວນສິນຄ້າ =​ {qtyCart}</div>
        <Link
          href="/web/member/cart"
          className="text-right  px-2 py-3 rounded-lg bg-white shadow-md transition-colors duration-300 flex items-center justify-center"
        >
          <i className="fa fa-shopping-cart"></i> ກະຕ່າຂອງຂໍ້ມູນ
        </Link>
      </div>
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="flex h-96 items-center justify-center">
            <div className="animate-spin rounded-full w-16 h-16 border-t-4 border-b-4 border-indigo-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {books.map((book: BookInterface) => (
              <div
                key={book.id}
                className="bg-white border border-gray-200 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1 transform "
              >
                <div className="flex justify-center mb-4">
                  <img
                    className="w-full h-48 object-contain rounded-lg bg-gray-100 p-4"
                    src={`${config.defaulturl}/public/upload/${book.image}`}
                    alt={book.name}
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {book.name}
                  </h3>
                  <p className="text-indigo-600 font-medium">
                    ລາຄາ: {book.price} ກີບ
                  </p>
                  {token ? (
                    <>
                      <button
                        onClick={(e) => handleaddCart(book.id)}
                        className="cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-300 w-full flex items-center justify-center"
                      >
                        <i className="fa fa-shopping-cart"></i>
                        ເພີ່ມລົງກະຕ່າ
                      </button>
                    </>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
