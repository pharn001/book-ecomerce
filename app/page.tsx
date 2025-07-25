import Link from "next/link";
import Swal from "sweetalert2";
import { config } from "./config";
import axios from "axios";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
      factdata();
    }, []);
    const factdata = async () => {
      try {
       
        const url = `${config.defaulturl}/api/book`;
        const response = await axios.get(url);
        if (response.status === 200) {
       
        }
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: error.message,
          text: "Something went wrong!",
          showConfirmButton: false,
        });
       
      } finally {
       
      }
    };
  
  return (
   <div className="flex  justify-center">
  
   </div>
  );
}
