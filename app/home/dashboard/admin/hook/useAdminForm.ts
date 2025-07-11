import { useState } from "react";
import { AdminData, AdminFormData } from "./useAdminData";
import Swal from "sweetalert2";
import { config } from "@/app/config";
import axios from "axios";

// ຈັດການພວກ  form logic & validation
export const useAdminForm = (onSuccess: (admin: AdminData) => void) => {
    const [editeId, setEditId] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const [formData, setFormData] = useState<AdminFormData>({
        name: "",
        username: "",
        level: "Administrator",
        password: "",
        confirmPassword: "",
    });

    const resetForm = () => {
        setFormData({
            name: "",
            username: "",
            level: "Administrator",
            password: "",
            confirmPassword: "",
        });
        setEditId("");
    }
    // ຕຽມຂໍ້ມູນສໍາລັບສົ່ງໄປ server
    const setEditMode = (admin: AdminData) => {
        setFormData({
            name: admin.name, // ເອົາຄ່າຈາກ formData ມາໃສ່ name
            username: admin.username, // ເອົາຄ່າຈາກ admin ມາໃສ່ username
            level: admin.level,  // ເອົາຄ່າຈາກ admin ມາໃສ່ level
            password: "",   // ບໍ່ເອົາລະຫັດຜ່ານເກົ່າມາໃສ່ (security!)
            confirmPassword: "",
        });
        setEditId(admin.id); // ກຳນົດ id ສໍາລັບການແກ້ໄຂ
    }

    const validateForm = (): boolean => {
        if (!editeId && formData.password !== formData.confirmPassword) {
            Swal.fire({
                title: "Error",
                text: "ລະຫັດຜ່ານບໍ່ຕົງກັນ",
                icon: "error",
                showConfirmButton: false,
            });
            return false;
        }
        return true;
    }
    const handleSubmit = async () => {
        if (!validateForm()) return;

        try {
            setIsSubmitting(true);
            const payload = {
                name: formData.name,
                username: formData.username,
                level: formData.level,
                password: formData.password,
            };
            const isCreate = editeId === "";
            const url = `${config.defaulturl}/api/admin/${isCreate ? "create" : "update-data"}`;
            const responseData = isCreate ? payload : { ...payload, id: editeId };
            const response = isCreate
                ? await axios.post(url, responseData)
                : await axios.put(url, responseData);
            if (response.status === 200) {
                Swal.fire({
                    title: "Success",
                    text: "ສໍາເລັດ",
                    icon: "success",
                });
                onSuccess({
                    id: isCreate ? response.data.id : editeId,
                    name: formData.name,
                    username: formData.username,
                    level: formData.level,
                });
                setIsSubmitting(false);
                resetForm();
            }
        } catch (error: any) {
            Swal.fire({
                title: "Error",
                text: error.message || "Something went wrong",
                icon: "error",
            });
            setIsSubmitting(false)
        }
    }
    const handledelete = async (admin: any) => {
        const button = await Swal.fire({
            title: "ລົບຜູ້ໃຊ້ງານ",
            text: "ຕ້ອງການລົບຜູ້ໃຊ້ງານຊື່: " + admin.name + "ຫຼືບໍ່?",
            icon: "question",
            showConfirmButton: true,
            showCancelButton: true,
            timer: 1500
        });
        if (button.isConfirmed) {
            try {
                const url = `${config.defaulturl}/api/admin/delete/${admin}`;
                const response = await axios.delete(url)
                if (response.status === 200){
                    Swal.fire({
                        title: "ສໍາເລັດ",
                        text: "ລົບຜູ້ໃຊ້ງານສໍາເລັດ",
                        icon: "success"
                    });                  
                }
            } catch (error: any) {
                Swal.fire({
                    title: "error",
                    text: error.message || "ບໍ່ສາມາດລົບຜູ້ໃຊ້ງານ",
                    icon: "error"
                })
            }
        }
    }
    return {
        //State Values
        isSubmitting,
        formData,
        setFormData,
        resetForm,
        editeId,
        // Functions
        setEditMode,
        validateForm,
        handleSubmit,
        handledelete,
        // Computed Value 
        isEditMode: editeId !== "",
    }
}

