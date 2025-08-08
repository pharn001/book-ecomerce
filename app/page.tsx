"use client";

import { useEffect } from "react";
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