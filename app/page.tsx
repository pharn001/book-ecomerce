"use client";

import { useEffect } from "react";
import { useDataBook } from "./home/dashboard/book/hook/usedataBook";
import { useRouter } from "next/navigation";


export default function Home() {
  const route = useRouter()  
  useEffect(() => {
   route.push('/web')
  }, []);

  return (
    <>
    </>
  );
}