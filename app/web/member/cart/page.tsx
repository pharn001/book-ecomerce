"use client";

import { config } from "@/app/config";
import Input from "@/app/home/component/form/input";
import { cartInterface } from "@/app/interface/Cart";
import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { Errorinterface } from "@/app/interface/Errorinterface";
import Image from "next/image";
function Page() {
  const router=useRouter()

  const [carts, setCarts] = useState<cartInterface[]>([]);
  const [memberId, setMemberId] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [qrImage, setQrImage] = useState("");
  const [loading, setLoading] = useState({
    member: false,
    cart: false,
    total: false,
    qr: false,
  });
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [file,setFile]=useState<File|null>(null)
  // แยกฟังก์ชันคำนวณยอดรวมออกมา และไม่ต้องใช้ loading state
  const computeTotalAmount = useCallback(() => {
    const total = carts.reduce(
      (sum, cart) => sum + cart.qty * cart.book.price,
      0
    );
    setTotalAmount(total);
  }, [carts]);

  const fetchMemberData = useCallback(async () => {
    try {
      setLoading((prev) => ({ ...prev, member: true }));
      const url = `${config.defaulturl}/api/member/info`;
      const token = localStorage.getItem(config.hoken_memter);

      if (!token) {
        throw new Error("ບໍ່ພົບ token");
      }

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200 && response.data?.id) {
        setMemberId(response.data.id);
      }
    } catch (err: unknown) {
      console.error("Error fetching member data:", err);
      Swal.fire({
        title: "Error",
        text:  (err as Errorinterface).message || "ບໍ່ສາມາດດຶງຂໍ້ມູນສະມາຊິກ",
        icon: "error",
      });
    } finally {
      setLoading((prev) => ({ ...prev, member: false }));
    }
  }, []);

  const fetchQrImage = useCallback(async () => {
    if (totalAmount <= 0) {
      setQrImage("");
      return;
    }

    try {
      setLoading((prev) => ({ ...prev, qr: true }));
      const url = `https://www.pp-qr.com/api/0868776053/${totalAmount}`;
      const response = await axios.get(url);

      if (response.status === 200 && response.data?.qrImage) {
        setQrImage(response.data.qrImage);
      }
    } catch (error: unknown) {
     
      setQrImage("");
      Swal.fire({
        title: "Warning",
        text: (error as Errorinterface).message||"ບໍ່ສາມາດດຶງ QR Code ໄດ້",
        icon: "warning",
        timer: 2000,
      });
    } finally {
      setLoading((prev) => ({ ...prev, qr: false }));
    }
  }, [totalAmount]);

  const fetchCartData = useCallback(async () => {
    if (!memberId) return;

    try {
      setLoading((prev) => ({ ...prev, cart: true }));
      const url = `${config.defaulturl}/api/cart/list/${memberId}`;
      const response = await axios.get(url);

      if (response.status === 200) {
        setCarts(Array.isArray(response.data) ? response.data : []);
      }
    } catch (err: unknown) {
      setCarts([]);
      Swal.fire({
        title: "Error",
        text:  (err as Errorinterface).message || "ບໍ່ສາມາດດຶງຂໍ້ມູນກະຕ່າ",
        icon: "error",
      });
    } finally {
      setLoading((prev) => ({ ...prev, cart: false }));
    }
  }, [memberId]);

  // ปรับปรุงฟังก์ชัน handleDelete
  const handleDelete = async (id: string) => {
    try {
      const cart = carts.find((cart) => cart.id === id);

      const result = await Swal.fire({
        title: "ລົບຂໍ້ມູນ",
        text: `ທ່ານຕ້ອງການລົບ "${
          cart?.book.name || "ສິນຄ້ານີ້"
        }" ອອກຈາກກະຕ່າບໍ່?`,
        icon: "question",
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "ລົບ",
        cancelButtonText: "ຍົກເລີກ",
      });

      if (result.isConfirmed) {
        const url = `${config.defaulturl}/api/cart/delete/${id}`;
        const response = await axios.delete(url);

        if (response.status === 200) {
          await fetchCartData();
          Swal.fire({
            title: "ສຳເລັດ",
            text: "ລົບສິນຄ້າອອກຈາກກະຕ່າແລ້ວ",
            icon: "success",
            timer: 1500,
          });
        }
      }
    } catch (err: unknown) {
      console.error("Error deleting cart item:", err);
      Swal.fire({
        title: "Error",
        text:  (err as Errorinterface).message || "ມີບາງຢ່າງຜິດພາດ",
        icon: "error",
        timer: 2000,
      });
    }
  };
  // ปรับปรุงฟังก์ชัน handleUpQty
  const handleUpQty = async (id: string) => {
    try {
      const url = `${config.defaulturl}/api/cart/upqty/${id}`;
      const response = await axios.put(url);

      if (response.status === 200) {
        await fetchCartData();
      }
    } catch (err: unknown) {
      console.error("Error updating quantity:", err);
      Swal.fire({
        title: "Error",
        text:  (err as Errorinterface).message || "ບໍ່ສາມາດເພີ່ມຈຳນວນໄດ້",
        icon: "error",
        timer: 1500,
      });
    }
  };
  // ปรับปรุງฟังก์ຽfunction handleDownQty
  const handleDownQty = async (id: string) => {
    try {
      const url = `${config.defaulturl}/api/cart/downqty/${id}`;
      const response = await axios.put(url);

      if (response.status === 200) {
        await fetchCartData();
      }
    } catch (err:unknown) {
      console.error("Error updating quantity:", err);
      Swal.fire({
        title: "Warning",
        text: "ຈຳນວນສິນຄ້າຕ້ອງມີຢ່າງນ້ອຍ 1 ຊິ້ນ",
        icon: "warning",
        timer: 1500,
      });
    }
  };
  // useEffect hooks
  useEffect(() => {
    fetchMemberData();
  }, [fetchMemberData]);

  useEffect(() => {
    if (memberId) {
      fetchCartData();
    }
  }, [memberId, fetchCartData]);

  useEffect(() => {
    computeTotalAmount();
  }, [carts, computeTotalAmount]);

  useEffect(() => {
    fetchQrImage();
  }, [totalAmount, fetchQrImage]);

  const handlesave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleupdateMember();
    await  handleUploadfile();
    await handleOrder()
    router.push("/web/member/cart/success");
  };
  const handleupdateMember = async()=>{
     try {
      const url = config.defaulturl + "/api/cart/confrim";
      const headers = {
        Authorization: "Bearer " + localStorage.getItem(config.hoken_memter),
      };
      const payload = {
        name: name,
        address: address,
        phone: phone,
      };
      const respone = await axios.post(url, payload, { headers });
      if (respone.status === 200) {
      
        Swal.fire({
          title:"success",
          icon:"success",
          text:"ການສັ່ງຊື້ສຳເລັດແລ້ວ!!"
        })
      }
    } catch (err: unknown) {
      Swal.fire({
        title: "error",
        text:  (err as Errorinterface).message,
        icon: "error",
      });
    }
  }
  const handleChooseFile= (files:unknown) => {
    const fileList:FileList = files as FileList;
    if(fileList.length > 0){
      setFile(fileList[0]);
    }
    try {
    } catch (err: unknown) {
      Swal.fire({
        title: "error",
        text:  (err as Errorinterface).message,
        icon: "error",
      });
    }
  };
  const handleUploadfile =async ()=>{
    const form = new FormData();
    form.append('file',file as Blob)
    const headers = {
    'Content-Type': 'multipart/form-data'
  }
    const url =config.defaulturl + "/api/cart/file";
    await axios.post(url,form,{headers})
  }
  const handleOrder= async ()=>{
    if(file){

      const url = config.defaulturl + "/api/cart/order"
       const headers = {
        Authorization: "Bearer " + localStorage.getItem(config.hoken_memter),
      };
      const payload = {
        slipName : file.name
      }
      const respone = await axios.post(url,payload,{headers})
      if (respone.status === 200){

      }
    }
  }


  const isLoading = loading.member || loading.cart;
  const uiCart = () => {
    return (
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">ກະຕ່າສິນຄ້າ</h2>

        {isLoading ? (
          <div className="flex h-96 items-center justify-center">
            <div className="animate-spin rounded-full w-16 h-16 border-t-4 border-b-4 border-indigo-500"></div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border shadow-sm rounded-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 border text-left">ຮູບພາບ</th>
                    <th className="py-3 px-4 border text-left">ຊື່</th>
                    <th className="py-3 px-4 border text-center">ຈຳນວນ</th>
                    <th className="py-3 px-4 border text-right">ລາຄາ</th>
                    <th className="py-3 px-4 border text-right">ລວມ</th>
                    <th className="py-3 px-4 border text-center">ຈັດການ</th>
                  </tr>
                </thead>
                <tbody>
                  {carts.length > 0 ? (
                    carts.map((cart) => (
                      <tr
                        key={cart.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-3 px-4 border">
                          <Image width={64} height={64}
                            src={`${config.defaulturl}/public/upload/${cart.book.image}`}
                            alt={cart.book.name}
                            className="w-16 h-16 object-cover rounded-lg mx-auto"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder-image.png";
                            }}
                          />
                        </td>
                        <td className="py-3 px-4 border">
                          <div className="font-medium">{cart.book.name}</div>
                        </td>
                        <td className="py-3 px-4 border text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <button
                              title="ເພີ່ມຈຳນວນ"
                              onClick={() => handleUpQty(cart.id)}
                              className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                            >
                              <i className="fas fa-plus text-sm"></i>
                            </button>
                            <span className="mx-3 font-medium min-w-[2rem] text-center">
                              {cart.qty}
                            </span>
                            <button
                              title="ລົດຈຳນວນ"
                              onClick={() => handleDownQty(cart.id)}
                              className="w-8 h-8 flex items-center justify-center bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors"
                            >
                              <i className="fas fa-minus text-sm"></i>
                            </button>
                          </div>
                        </td>
                        <td className="py-3 px-4 border text-right font-medium">
                          {cart.book.price.toLocaleString()} ກີບ
                        </td>
                        <td className="py-3 px-4 border text-right font-semibold">
                          {(cart.qty * cart.book.price).toLocaleString()} ກີບ
                        </td>
                        <td className="py-3 px-4 border text-center">
                          <button
                            title="ລົບອອກຈາກກະຕ່າ"
                            onClick={() => handleDelete(cart.id)}
                            className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors mx-auto"
                          >
                            <i className="fas fa-trash text-sm"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="py-8 text-center text-gray-500"
                      >
                        <i className="fas fa-shopping-cart text-4xl mb-2 opacity-50"></i>
                        <div>ບໍ່ມີສິນຄ້າໃນກະຕ່າ</div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-6 bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div className="text-lg">
                  ຈຳນວນສິນຄ້າທັງໝົດ:{" "}
                  <span className="font-semibold">{carts.length} ລາຍການ</span>
                </div>
                <div className="text-right">
                  <h3 className="text-2xl font-bold text-green-600">
                    ລວມທັງໝົດ: {totalAmount.toLocaleString()} ກີບ
                  </h3>
                  {carts.length > 0 && (
                    <button className="mt-3 bg-green-500 hover:bg-green-600 text-white py-3 px-8 rounded-lg font-medium transition-colors shadow-sm">
                      <i className="fas fa-shopping-bag mr-2"></i>
                      ດໍາເນີນການສັ່ງຊື້
                    </button>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  const uiPayment = () => {
    if (carts.length === 0) return null;

    return (
      <div className="container mx-auto p-4 mt-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">
            ຂໍ້ມູນການຊໍາລະເງິນ
          </h2>

            <form action="" onSubmit={(e)=>handlesave(e)}>
          <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-4">ຂໍ້ມູນການຈັດສົ່ງ</h3>
                <Input required
                  label="ຊື່ຜູ້ຮັບ *"
                  onChange={(e) => setName(e.target.value)}
                />
                <Input required
                  label="ເບີໂທຕິດຕໍ່ *" type="number"
                  onChange={(e) => setAddress(e.target.value)}
                />
                <Input required
                  label="ທີ່ຢູ່ຈັດສົ່ງ *"
                  onChange={(e) => setPhone(e.target.value)}
                />
                <Input label="ເອກະສານການໂອນ *" type="file" onChange={(e)=>handleChooseFile(e.target.files)}/>
                <div className="pt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ໝາຍເຫດເພີ່ມເຕີມ
                  </label>
                  <textarea 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="ກະລຸນາລະບຸຂໍ້ມູນເພີ່ມເຕີມ (ຖ້າມີ)"
                  ></textarea>
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-lg font-semibold mb-4">
                  QR Code ສໍາລະເງິນ
                </h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  {loading.qr ? (
                    <div className="flex flex-col items-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-3"></div>
                      <span className="text-gray-500">
                        ກໍາລັງໂຫຼດ QR Code...
                      </span>
                    </div>
                  ) : qrImage ? (
                    <div className="flex flex-col items-center">
                      <Image width={192} height={192}
                        src={qrImage}
                        alt="QR Code for payment"
                        className="w-48 h-48 object-contain border rounded-lg shadow-sm"
                      
                      />
                      <p className="mt-3 text-sm text-gray-600">
                        ສະແກນ QR Code ເພື່ອຊໍາລະເງິນ
                      </p>
                      <p className="text-lg font-bold text-green-600 mt-2">
                        {totalAmount.toLocaleString()} ກີບ
                      </p>
                    </div>
                  ) : (
                    <div className="text-gray-500">
                      <i className="fas fa-qrcode text-4xl mb-3 opacity-50"></i>
                      <p>ບໍ່ສາມາດສ້າງ QR Code ໄດ້</p>
                    </div>
                  )}
                </div>

                {qrImage && (
                  <button
                    type="submit"
                    className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
                  >
                    <i className="fas fa-check-circle mr-2"></i>
                    ຢືນຢັນການຊໍາລະເງິນ
                  </button>
                )}
              </div>
          </div>
            </form>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {uiCart()}
      {uiPayment()}
    </div>
  );
}

export default Page;
