"use client";

import Link from "next/link";

export default function SideBar() {
    return (
        <div >
           <div className="header">
            <h1>Book office</h1>
            <p>sompharn nothing</p>
           </div>
           <div className="body">
            <Link className="item" href="/dashboard">
            <i className="fa fa-chart-line"></i>
            bashboard</Link>
            <Link className="item" href="/book">
            <i className="fa-solid fa-book"></i>
            ໜັງສື</Link>
            <Link className="item" href="/order">
            
            ລາຍການ</Link>
            <Link className="item" href="/admin">
            <i className="fa fa-user-cog"></i>
            ຜູ້ໃຊ້ລະບົບ</Link>
           </div>
        </div>
    )
}