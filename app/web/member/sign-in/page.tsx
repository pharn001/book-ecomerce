"use client";
import { config } from "@/app/config";
import Button from "@/app/home/component/form/button";
import Input from "@/app/home/component/form/input";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";



export default function SignInPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

 
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    try {
        const url = config.defaulturl + "/api/member/signin";
        const data = {
            username: username,
            password: password
        };
        const response = await axios.post(url, data);
        if(response.status === 200){
            localStorage.setItem(config.hoken_memter, response.data.token)
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'You have successfully signed in!',
                confirmButtonText: 'OK'
            }).then(() => {
               window.location.href = "/web";
            });
        }
    } catch (err:any) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.message || 'Something went wrong!',
            confirmButtonText: 'OK'
        })
    }
    }
    return (
        <div>
        <h1>ເຂົ້າສູຸ່ລະບົບ</h1>
        <p>ກະລຸນາໃສ່ຂໍ້ມູນສຳລັບການເຂົ້າລະບົບ</p>
       <form onSubmit={(e)=>handleSubmit(e)}>
            <div className="space-y-4">
                <Input label="ຊື່" placeholder="ຊື່" onChange={(e)=>setUsername(e.target.value)} required/>
            </div>
            <div className="space-y-4">
                <Input label="ລະຫັດຜ່ານ" placeholder="ລະຫັດຜ່ານ" onChange={(e)=>setPassword(e.target.value)} required/>
            </div>
            <Button label="ເຂົ້າລະບົບ" icon="fa fa-lock" type="submit"/>
       </form>
        </div>
    );
}