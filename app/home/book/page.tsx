"use client";
import React, { useEffect, useState } from "react";
import Input from "../component/form/input";
import useInput from "./hook/useInput";
import axios from "axios";
export default function Page() {
  const [value, setValue] = useState("");
  const [data, setData] = useState(null);
  const debouncedValue = useInput(value, 1000);
  useEffect(() => {
    if (debouncedValue) {
      axios
        .get(`http://localhost:3000/home/book/api?query=${debouncedValue}`)
        .then((response) => {
          console.log("API Response:", response.data);
          setData(response.data.message);
        });
    }
  }, [debouncedValue]);
  return (
    <div>
      <Input
        label="type anything "
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <p>Debounced Value: {debouncedValue}</p>
      <p> {data}</p>
    </div>
  );
}


