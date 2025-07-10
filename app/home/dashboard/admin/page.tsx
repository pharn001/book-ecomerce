"use client";
import React,{useState} from "react";
import { AdminData, useAdminData } from "./hook/useAdminData";
import { useAdminForm } from "./hook/useAdminForm";
import AdminTable from "@/app/home/component/AdminTable";
import AdminForm from "@/app/home/component/AdminForm";
import Swal from "sweetalert2";


function Admin() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { data, loading, error, fetchData } = useAdminData();
  const {
    formData,
    setFormData,
    setEditMode,
    resetForm,
    handleSubmit,
    isEditMode,
    isSubmitting,
  } = useAdminForm(() => {
    fetchData();
    setModalOpen(false);
  });

  const openModal = () => setModalOpen(true);

  const closeModal = () => {
    setModalOpen(false);
    resetForm();
  };

  const handleEdit = (admin: AdminData) => {
    setEditMode(admin);
    openModal();
  };
const handleDelete = async (admin: any) => {
 handleDelete(admin);
}
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

        <AdminTable
          onDelete={handleDelete}
          data={data}
          loading={loading}
          error={error}
          onEdit={handleEdit}
        />

        <AdminForm
          isSubmitting={isSubmitting}
          isOpen={modalOpen}
          onClose={closeModal}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          isEditing={isEditMode}
        />
      </div>
    </div>
  );
}

export default Admin;