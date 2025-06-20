import React, { useState } from 'react';
import Link from "next/link";
import { item } from "@/app/home/component/ItemLink";
import { usePathname } from 'next/navigation';

function Navigation() {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-slate-900 to-slate-800 border-r border-slate-700/50 w-64 p-4 space-y-2">
      {/* Logo/Branding Section */}
      {/* <div className="flex items-center justify-center mb-8 p-4">
        <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-300">
          YourLogo
        </div>
      </div> */}

      {/* Dashboard Link */}
      <Link
        href="/home/dashboard"
        className={`relative flex items-center p-3 rounded-lg transition-all duration-300 group ${
          pathname === '/home/dashboard'
            ? 'bg-indigo-500/20 text-indigo-100 shadow-md'
            : 'text-slate-300 hover:bg-slate-700/50 hover:shadow-sm'
        }`}
        onMouseEnter={() => setHoveredItem('dashboard')}
        onMouseLeave={() => setHoveredItem(null)}
      >
        <i className="fa-solid fa-house text-lg w-6 text-center mr-3 transition-transform duration-300 group-hover:scale-110"></i>
        <span className="font-medium">Dashboard</span>
        {(hoveredItem === 'dashboard' || pathname === '/home/dashboard') && (
          <span className="absolute left-0 top-0 h-full w-1 bg-indigo-400 rounded-r-full"></span>
        )}
        {pathname === '/home/dashboard' && (
          <span className="ml-auto text-xs px-2 py-1 rounded-full bg-indigo-500/30 text-indigo-100">
            Active
          </span>
        )}
      </Link>

      {/* Menu Items */}
      {item.map((i, index) => {
        const hoverKey = `item-${index}`;
        return (
          <Link
            key={index}
            href={i.href}
            className={`relative flex items-center p-3 rounded-lg transition-all duration-300 group ${
              pathname === i.href
                ? 'bg-indigo-500/20 text-indigo-100 shadow-md'
                : 'text-slate-300 hover:bg-slate-700/50 hover:shadow-sm'
            }`}
            onMouseEnter={() => setHoveredItem(hoverKey)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <i className={`${i.icon} text-lg w-6 text-center mr-3 transition-transform duration-300 group-hover:scale-110`}></i>
            <span className="font-medium">{i.name}</span>
            {(hoveredItem === hoverKey || pathname === i.href) && (
              <span className="absolute left-0 top-0 h-full w-1 bg-indigo-400 rounded-r-full"></span>
            )}
            {pathname === i.href && (
              <span className="ml-auto text-xs px-2 py-1 rounded-full bg-indigo-500/30 text-indigo-100">
                Active
              </span>
            )}
          </Link>
        );
      })}

      {/* User Profile Section */}
      <div className="mt-auto pt-4 border-t border-slate-700/50">
        <div className="flex items-center p-3 rounded-lg hover:bg-slate-700/50 transition-colors duration-300 cursor-pointer group">
          <div className="relative w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-white mr-3 overflow-hidden">
            <i className="fa-solid fa-user text-sm"></i>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-white truncate">John Doe</div>
            <div className="text-xs text-slate-400 truncate">Administrator</div>
          </div>
          <i className="fa-solid fa-chevron-down text-xs text-slate-400 ml-2 transition-transform duration-300 group-hover:translate-x-1"></i>
        </div>
      </div>
    </div>
  );
}

export default Navigation;