import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import useConversation from '../zustand/useConversation'

const useGetMessages =()=>{
    const [loading,setLoading]=useState(false) 
    const {messages,setMessages,selectedConversation}=useConversation()
    useEffect(()=>{
        const getMessages=async()=>{
            setLoading(true)
            try{
                const res=await fetch(`/api/auth/messages/${selectedConversation._id}`)
                const data=await res.json()
                console.log(data)
                if(data.error){
                    throw new Error(data.error)

                }
                setLoading(false)
                setMessages(data)
            }catch(e){
                toast.error(e.message)
            }finally{
                setLoading(false)
            }
        }
        if(selectedConversation?._id) getMessages()
    },[selectedConversation._id,setMessages])
    return {messages,loading}
}

export default useGetMessages
