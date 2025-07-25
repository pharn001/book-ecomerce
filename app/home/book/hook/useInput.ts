import { useEffect, useState } from "react";


function useInput(value:string, delay :number){
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(()=>{
        const timeOut = setTimeout(()=>{
            setDebouncedValue(value);
        },delay)
        return () => {
            clearTimeout(timeOut);
        }
    }, [value, delay]);
    return debouncedValue;

}
export default useInput;