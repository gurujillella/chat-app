import React, { useState } from 'react'
import { BiSend } from 'react-icons/bi'
import useSendMessage from './useSendMessage'

const MessageInput = () => {
  const [message,setMessage]=useState("") 
  const {loading,sendMessage}=useSendMessage()
  const handleSubmit=async (e)=>{
    e.preventDefault()
    if(!message) return;
    await sendMessage(message)
    setMessage("")
  }
  return (
    <form className='px-4 my-3' onSubmit={handleSubmit}>
        <div className='w-full relative'>
            <input type="text" value={message} className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 text-white' placeholder="Enter some Message" onChange={(e)=>setMessage(e.target.value)}/>
            {loading?< div className="loading loading-spinner"></div>:<button type='submit' className='absolute inset-y-1 end-0 flex items pe-3 my-2'><BiSend/></button>}
        </div>
    </form>
  )
}

export default MessageInput
