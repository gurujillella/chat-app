import { useState } from "react"
import useConversation from "../zustand/useConversation"
import toast from 'react-hot-toast'


const useSendMessage=()=>{
    const [loading,setLoading]=useState(false)
    const {messages,setMessages,selectedConversation}=useConversation()
    const sendMessage=async(message)=>{
        setLoading(true)

        try{
            const res=await fetch(`/api/auth/messages/send/${selectedConversation._id}`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({message})
            })
            const data=await res.json()
            if(data.error){
                throw new Error(data.error)
            }
            setMessages([...messages,data])
        
            setLoading(false)
        }catch(e){
            toast.error(e.message)
        }
        finally{
            setLoading(false)
        }
    }
    return {loading,sendMessage}
}

export default useSendMessage