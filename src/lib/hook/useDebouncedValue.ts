import { useEffect, useState } from "react";

export function useDebouncedValue<T>(value : T , delay : number = 300) : T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)
    useEffect(() => {
        const time = setTimeout(() => setDebouncedValue(value), delay)

        return () => clearTimeout(time)
    }, [value,delay])
    return debouncedValue
}