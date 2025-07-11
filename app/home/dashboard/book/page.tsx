"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { config } from "@/app/config";
import Swal from "sweetalert2";
import Modal from "../../component/modal";

interface AdminData {
  id: string;
  name: string;
  username: string;
  level: string;
}

function Admin() {
  const [data, setData] = useState<AdminData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const url = `${config.defaulturl}/api/admin/list`;
      const response = await axios.get(url);

      if (response.status === 200) {
        setData(response.data);
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch data");
      Swal.fire({
        title: "Error",
        text: err.message || "Something went wrong",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const handleEdit = (id: string) => {
    // Handle edit logic here
    setModalOpen(true);
    console.log("Edit admin with ID:", id);
  };
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Admin Management</h1>
          <button
            onClick={openModal}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
          >
            <i className="fa fa-plus mr-2"></i>
            Add Admin
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Username
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    action
                  </th>
                </tr>
              </thead>
              <tbody className="tablebody">
                {data.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.name}
                    </td>
                    <td className="tabletd">{item.username}</td>
                    <td className="tabletd">{item.level}</td>
                    <td className="tabletd">
                      <button className="text-blue-600 hover:text-blue-800 mr-2">
                        <i className="fa fa-edit" onClick={handleEdit}></i> Edit
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <i className="fa fa-trash"></i> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modalOpen && (
        <Modal onClose={closeModal} title="Add Admin" size="sm">
          <form className="">
            <div className="space-y-1 mb-4">
              <label htmlFor="">ຊື່</label>
              <input type="text" name="" id="" placeholder="ປ້ອນຊື່ຜູ້ນຳໃຊ້" />
            </div>
            <div className="space-y-1 mb-4">
              <label htmlFor="">ຊື່ຜູ້ນຳໃຊ້</label>
              <input type="text" name="" id="" placeholder="ປ້ອນຊື່ຜູ້ນຳໃຊ້" />
            </div>
            <div className="space-y-1 mb-4">
              <label htmlFor="">ລະດັດ</label>
              <select name="" id="">
                <option value="Administrator">Admin</option>
                <option value="user">User</option>
                <option value="superadmin">Super Admin</option>
              </select>
            </div>
            <div className="space-y-1 mb-4">
              <label htmlFor="">ຊືີ່</label>
              <input type="text" name="" id="" placeholder="ປ້ອນຊື່ຜູ້ນຳໃຊ້" />
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

export default Admin;