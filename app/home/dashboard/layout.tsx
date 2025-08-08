"use client";
import { Suspense } from "react";
import "../../globals.css";
import SideBar from "../component/sideBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
        <div className="flex ">
          <div >            
              <SideBar />
          </div>
          <div className="flex-1 m-2">
            <Suspense >
              {children}
            </Suspense>
          </div>
          </div>
 
  );
}

