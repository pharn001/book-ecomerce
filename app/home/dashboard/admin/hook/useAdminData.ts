
import axios from "axios";
import { useEffect, useState } from "react";
import { config } from "@/app/config";
import Swal from "sweetalert2";

export interface AdminData {
  id: string;
  name: string;
  username: string;
  level: string;
}

export interface AdminFormData {
  name: string;
  username: string;
  level: string;
  password: string;
  confirmPassword: string;
}

export const useAdminData = () => {
  const [data, setData] = useState<AdminData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, fetchData };
};
