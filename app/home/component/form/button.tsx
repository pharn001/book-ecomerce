interface ButtonProps {
  label: string;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  icon?:string;
}

const Button = ({
  label,
  disabled = false,
  className = "",
  type,
  onClick,
  icon='fa-solid fa-user-pen',
}: ButtonProps) => {
  return (
    <button
      type={type || "button"}
      disabled={disabled}
        onClick={onClick}
      className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 ${className}`}
    >
      {disabled ? (
        <div className="flex items-center justify-center space-x-2">
            <i className="fa-solid fa-circle-notch text-white text-2xl animate-spin"></i>
            <div className="font-bold uppercase">Loding...</div>
        </div>
      ):(
        <div className="">
            <i className={`${icon} mr-2`} ></i>{label}
        </div>
      )}
      
    </button>
  );
};
export default Button;
