"use client";
import { config } from "@/app/config";
import { BookInterface } from "@/app/interface/book";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Button from "../../component/form/button";
import Modal from "../../component/modal";
import Input from "../../component/form/input";

function page() {
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [books, setBooks] = useState<BookInterface[]>([]);
  const [id, setId] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isbn, setIsbn] = useState("");
  const [modal, setModal] = useState<boolean>(false);
  useEffect(() => {
    factdata();
  }, []);
  const factdata = async () => {
    try {
      const url = `${config.defaulturl}/api/book`;
      const response = await axios.get(url);
      if (response.status === 200) {
        setBooks(response.data);
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: error.message,
        text: "Something went wrong!",
        showConfirmButton: false,
      });
    }
  };

  const hadlesubmit = async () => {
    try {
      setIsSubmit(true);
      const url = config.defaulturl + "/api/book";
      const payload = {
        isdn: isbn,
        name: name,
        price: price,
        description: description,
      };
      const response = await axios.post(url, payload);
      if (response.status === 200) {
        Swal.fire({
          title: "success",
          text: "insert Successfully!",
          icon: "success",
          showConfirmButton: false,
          timer:1000
        });
        setIsSubmit(false);
        factdata();
        closeModal();
        setIsbn("");
        setName("");
        setPrice(0);
        setDescription("");
      }
      console.log(response.status);
    } catch (error: any) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
      setIsSubmit(false);
    }
  };
  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };
  function deletebook(e:string) {
   try {
    console.log(e)
   } catch (error:any) {
    Swal.fire({
      title:"error",
      text:error.message,
      icon:"error"
    })
   }
  }

  return (
    <div>
      <div className="header">
        <h1 className="text-2xl font-bold">Book</h1>
        <Button className="" label="Add Book" onClick={openModal} />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                isbn
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ຊື່ໜັງສື
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ລາຄາ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ລາຍລະອຽດ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                action
              </th>
            </tr>
          </thead>
          <tbody className="tablebody">
            {books.map((book: BookInterface) => (
              <tr key={book.id}>
                <td className="tabletd">{book.isdn}</td>
                <td className="tabletd">{book.name}</td>
                <td className="tabletd">{book.description}</td>
                <td className="tabletd">{book.price.toLocaleString()}</td>
                <td>
                  <div className="">
                    <button className="text-blue-600   mr-2">
                      <i className="fa fa-edit"></i>
                      edit
                    </button>
                    <button className="text-red-700  " onClick={()=>deletebook(book.id)}>
                      <i className="fa fa-trash"></i>
                      delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal ? (
        <Modal onClose={closeModal} title="ນັງສື" size="sm">
          <form action="">
            <div className="space-y-4">
              <Input
                label="isbn"
                name="isbn"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
                placeholder="ກະລຸນາປ້ອນ isbn"
              />
            </div>
            <div className="space-y-4">
              <Input
                label="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-4">
              <Input
                label="price"
                type="number"
                name="price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
            <div className="space-y-4">
              <Input
                label="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="button">
              <Button label="save" onClick={hadlesubmit} disabled={isSubmit} />
            </div>
          </form>
        </Modal>
      ) : null}
    </div>
  );
}

export default page;
