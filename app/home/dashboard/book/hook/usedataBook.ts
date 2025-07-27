import axios from "axios";
import { config } from "@/app/config";
import { useEffect,useState } from "react";
import Swal from "sweetalert2";
import { BookInterface } from "@/app/interface/book";

export const useDataBook =  () => {
    const [book, setBook] = useState<BookInterface[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    
    const factdata = async ()=>{
        try {
            setLoading(true);
            setError(null);
           const url = config.defaulturl+"/api/book";
           const response = await axios.get(url);
              if (response.status === 200) {
                setBook(response.data);
                setLoading(false);
              }

        } catch (err:any) {
            setError(err.message);
            setLoading(false);
            Swal.fire({
                icon: "error",
                title: err.message,
                text: "Something went wrong!",
                showConfirmButton: false,
            });
            
        }
    }
 
    return { book, loading, error ,factdata};
}
