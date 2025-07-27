import Swal from "sweetalert2";
import  { useEffect, useState } from "react";
import axios from "axios";
import { config } from "@/app/config";
import { BookInterface } from "@/app/interface/book";
export const usedatabook = () => {

    const [loading, setLoading] = useState<boolean>(true)
    const [books, setBooks] = useState<BookInterface[]>([]);
    const factdata = async () => {
        try {
            setLoading(true);
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
            setLoading(false);
        } finally {
            setLoading(false)
        }
    }


    return { loading, setLoading, books, setBooks , factdata };
}