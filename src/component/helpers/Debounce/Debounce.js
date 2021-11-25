import { useRef } from "react";

export default function useDebounce (fn, delay){
    const timeoutRef = useRef(null)

    function deboucendFn(...agrs){
        window.clearTimeout(timeoutRef.current)
        timeoutRef.current = window.setTimeout(()=>{
            fn(...agrs)
        }, delay)
    }

    return deboucendFn
}