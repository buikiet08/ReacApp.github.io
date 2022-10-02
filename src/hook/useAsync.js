import { useEffect, useState } from "react"

export const useAsync = (promise, imadiate = false) => {
    const [error,setError] = useState()
    const [loading,setLoading] = useState()
    useEffect(() => {
        if(imadiate) {
            excute()
        }
    }, [])
    const excute = async (...rest) => {
        try {
            setLoading(true)
            setError('')
            const res = await promise(...rest)
            return res
        } catch (error) {
            setError(error.message || error.error || error)
            throw error 
        } finally {
            setLoading(false)
        }
    }

    return {
        excute, loading , error
    }
}