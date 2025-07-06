"use client";

import { useState } from "react";
import FormInput from "../component/form/input";

export default function DashboardPage() {
    const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <>
      <h1>Dashboard</h1>
      <div className=" bg-gray-100  w-[300px] h-[300px] flex items-center justify-center ">
        <i className="fa-solid fa-circle-notch text-gray-700 text-[40px] animate-spin"></i>
      </div>
      <FormInput 
       label="Name"
        name="name"
        value={formData.name}
        icon="fa-solid fa-user"
        onChange={handleChange}
        placeholder="Enter your name"
      />
    </>
  );
}
