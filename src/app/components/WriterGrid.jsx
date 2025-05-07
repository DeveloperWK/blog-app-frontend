"use client"
import {useEffect, useState} from "react";
import WriterCard from "@/app/components/WriterCard";
import {toast} from "react-toastify";

const WriterGrid = () => {
    const [writer,setWriter] = useState([])
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState(false)
    const [errorMsg,setErrorMsg] = useState('')

    const fetchWriter = async () => {
        try {
            setLoading(true)
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}users/writers`,{
              cache: 'no-cache',
            })
            const data = await res.json()
            console.log(data)
            if(!res.ok){
                setErrorMsg(data?.message)
                setError(true)
                setLoading(false)
                return
            }
            setWriter(data?.writers)
            setLoading(false)
        }catch (err){
            setError(true)
            setLoading(false)
            console.error("Error :", err);
            toast.error("Failed to fetch writers. Please try again later.");
        }
    }
    useEffect(() => {
        fetchWriter()
    },[])

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {writer?.length === 0 && loading && <div className="text-center text-white text-xl">Loading...</div> }
            {errorMsg && !loading && <div className="text-center text-white text-xl">{errorMsg}</div>}
            {writer?.length > 0 && !loading &&
                writer?.map((_, i) => (
                <WriterCard key={i} {...writer} />
            ))}
        </div>
    )
}
export default WriterGrid;