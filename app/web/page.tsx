"use client";

import { config } from "@/app/config";
import { useDataBook } from "@/app/home/dashboard/book/hook/usedataBook";
import { BookInterface } from "@/app/interface/book";
import { useEffect } from "react";

export default function Home() {
  const { book, loading, error, factdata } = useDataBook();
  
  useEffect(() => {
    factdata();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
      
        
        {loading ? (
          <div className="flex h-96 items-center justify-center">
            <div className="animate-spin rounded-full w-16 h-16 border-t-4 border-b-4 border-indigo-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {book.map((book: BookInterface) => (
              <div 
                key={book.id} 
                className="bg-white border border-gray-200 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1 transform "
              >
                <div className="flex justify-center mb-4">
                  <img 
                    className="w-full h-48 object-contain rounded-lg bg-gray-100 p-4" 
                    src={`${config.defaulturl}/public/upload/${book.image}`} 
                    alt={book.name} 
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">{book.name}</h3>
                  <p className="text-indigo-600 font-medium">
                    ລາຄາ: {book.price} ກີບ
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}