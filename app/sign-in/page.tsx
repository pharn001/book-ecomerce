"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { config } from "../config";
import { useRouter } from "next/navigation";
export default function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handlesubmit = async (e: React.FormEvent)=>{
    e.preventDefault()
    try {
      const urlSignIn = config.defaulturl + "/api/admin/signin";
      console.log(urlSignIn);
     const payload = {  
        username: username,
        password: password,
      };
      // Make the POST request to the sign-in endpoint
      const response = await axios.post(urlSignIn, payload);
      router.push("/home/dashboard");
        localStorage.setItem(config.hoken, response.data.token);     
    } catch (error: any) {
      console.error("Error during sign-in:", error);
      Swal.fire({
        icon: "error",
        title: "Sign In Failed",
        text: error || "An error occurred during sign-in.",
      })
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md border border-blue-200">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Sign In</h2>
        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            onClick={handlesubmit}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
