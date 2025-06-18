import React from 'react'
import Link from "next/link";
import { item } from "@/app/home/component/ItemLink";
function Navigation() {

  return (
     <div className="body">
        <Link className="item" href="/home/dashboard">
          <i className="fa-solid fa-house"></i>
          bashboard
        </Link>
       {item.map((i,index)=>(
        <Link key={index} className="item" href={i.href}>
          <i className={i.icon}></i>
          {i.name}
        </Link>
       ))}
      </div>
  )
}

export default Navigation
