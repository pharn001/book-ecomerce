"use client";
import  { useEffect, useState } from "react";
import axios from "axios";
import { config } from "@/app/config";
import { useDataBook } from "./hook/usedataBook";
import Button from "../../component/form/button";
import Modal from "../../component/modal";
import Input from "../../component/form/input";
import Swal from "sweetalert2";
import { BookInterface } from "@/app/interface/book";

function page() {
  
  const [isSubmit, setIsSubmit] = useState<boolean>(false);




  const [id, setId] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isbn, setIsbn] = useState("");
  const [imgfile, setImgfile] = useState<File | null>();
  const [modal, setModal] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");

const { book, loading,factdata } = useDataBook();

  useEffect(() => {
    factdata();
  }, []);
  
  const hadlesubmit = async () => {
    try {
      setIsSubmit(true);
      const data  = new FormData();
     
        data.append("image", imgfile as Blob);
        data.append("name", name);
        data.append("price", price.toString());
        data.append("description", description);
        data.append("isdn", isbn);

     
      const isCreate = id === "";
      const url = config.defaulturl + "/api/book";
      
      const response = isCreate
        ? await axios.post(url, data)
        : await axios.put(`${url}/${id}`, data);

      if (response.status === 200) {
        Swal.fire({
          title: "success",
          text: " Successfully!",
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
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
    setIsbn("");
    setName("");
    setPrice(0);
    setDescription("");
    setImageUrl("");
    setId("");
  };
const deletebook = async (e: string)=> {
    try {
    const button = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    })
    if (!button.isConfirmed) return;
     const url = `${config.defaulturl}/api/book/${e}`;
      const response = await axios.delete(url);
      if (response.status === 200) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
        });
        factdata();
      }
    } catch (error: any) {
      Swal.fire({
        title: "error",
        text: error.message,
        icon: "error",
      });
    }
  }
  const handledit = (book: BookInterface) => {
    setId(book.id);
    setIsbn(book.isdn ?? "");
    setName(book.name);
    setPrice(book.price);
    setDescription(book.description ?? "");
    setModal(true);
    setImageUrl(book.image as string);
  };
  const choosefile = (files: any) => {
    if (files.length > 0) {
      setImgfile(files[0]);
      console.log(files);
    }
  };
 
  return (
    <div className="h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto rounded-lg shadow-lg p-6">
        <div className="header">
          <h1 className="text-2xl font-bold">Book</h1>
          <Button className="" label="Add Book" onClick={openModal} />
        </div>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="animate-spin rounded-full w-12 h-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ຮູບພາບ
                  </th>
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
                {book.map((book: BookInterface) => (
                  <tr key={book.id}>
                    <td className="tabletd">
                      {book.image ? (
                        <img
                          src={`${config.defaulturl}/public/upload/${book.image}`}
                          alt={book.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      ) : (
                        <i className="fa fa-image text-6xl"></i>
                      )}
                    </td>
                    <td className="tabletd">{book.isdn}</td>
                    <td className="tabletd">{book.name}</td>
                    <td className="tabletd">{book.description}</td>
                    <td className="tabletd">{book.price.toLocaleString()}</td>
                    <td>
                      <div className="">
                        <button
                          className="text-blue-600   mr-2"
                          onClick={(e) => handledit(book)}
                        >
                          <i className="fa fa-edit"></i>
                          edit
                        </button>

                        <button
                          className="text-red-700  "
                          onClick={() => deletebook(book.id)}
                        >
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
        )}

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
              <div className="space-y-4">
               {imageUrl ? (
                <img
                  src={`${config.defaulturl}/public/upload/${imageUrl}`}
                  alt="Book Cover"
                  className="w-16 h-16 object-cover rounded mb-2"
                />
               ) :null}
                <Input
                  label="ຮູບພາບ"
                  name="imgfile"
                  type="file"
                  onChange={(e) => choosefile(e.target.files )}
                />
              </div>
              <div className="button">
                <Button
                  label="save"
                  onClick={hadlesubmit}
                  disabled={isSubmit}
                  icon="fa fa-plus"
                />
              </div>
            </form>
          </Modal>
        ) : null}
      </div>
    </div>
  );
}

export default page;
