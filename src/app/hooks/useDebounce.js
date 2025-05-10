import {useEffect, useState} from "react";

const useDebounce = (value,delay) => {
    const [debounced,setDebounced] = useState()
    useEffect(() => {
        const timer = setTimeout(()=>setDebounced(value),delay)
        return ()=>clearTimeout(timer)
    }, [value,delay]);
    return debounced;
}
export default useDebounce;