"use client";
import "../../globals.css";
import SideBar from "../component/sideBar";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
        <div className="flex h-screen">
          <div >            
              <SideBar />
          </div>
          <div >
            {children}
          </div>
          </div>
 
  );
}

