import { useState } from "react"
import useDebounce from "../helpers/Debounce/Debounce"

export default function Seach ({value, onChange}){
    const deboucedChange = useDebounce(onChange, 500)
    const [displayValue, setDisplayValue] = useState(value)

    const handleChange = (e)=>{
        setDisplayValue(e.target.value)
        deboucedChange(e.target.value)
    }


    return(
        <input
            type='text'
            value={displayValue}
            onChange={handleChange}
            placeholder='Seu Anime'
        />
    )
}