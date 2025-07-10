

interface SelectProps {
    label?:string;
    name?:string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    children: React.ReactNode;
}

const Select: React.FC<SelectProps> =({
label,
name,
value,
onChange,
children
})=>{
    return(
        <>
            {label && <label htmlFor={name} className="block mb-1 font-semibold">{label}</label>}
            <select name={name} 
            value={value}
            onChange={onChange}
            className="w-full border px-3 py-2 rounded"
            >
                {children}
            </select>
        </>
    )
}
export default Select;