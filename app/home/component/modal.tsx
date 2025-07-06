"use client";

import React, { useEffect, useRef } from "react";

interface ModalProps {
  id?: string;
  title: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  onClose: () => void;
}

const Modal = ({ id, title, children, size = "md", onClose }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  const modalSizeClass = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  return (
    <div className="modal ">
   
        

      {/* Modal container */}
      <div className="modal-container">
        {/* Modal content */}
        <div
          ref={modalRef}
          id={id}
          className={`modal-content ${modalSizeClass[size]}`}
         
        >
          {/* Modal header */}
          <div className="modal-header">
            <h3 className="text-lg font-medium " id="modal-title">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="r"
                aria-label="Close modal"
            >
            <i className="fa fa-times"></i>
            </button>
          </div>

          {/* Modal body */}
          <div className="px-6 py-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;