import React, { useEffect } from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'
import {TiMessages} from 'react-icons/ti'
import useConversation from '../zustand/useConversation'
import { useAuthContext } from '../context/Authcontext'

const MessageContainer = () => {
  const noChatSelected=true
  const {selectedConversation,setSelectedConversation}=useConversation()
  useEffect(()=>{
    return()=>{
      setSelectedConversation(null)
    }
  },[setSelectedConversation])
  return (
    <div className='md:min-w-[450px] flex flex-col'>
        {!selectedConversation?<NoChatSelected/>:(
          <div>
          <div className='bg-slate-500 px-4 py-2 mb-2'>
              <span className='label-text'>To:</span>{" "}
              <span className='text-gray-900 font-bold'>{selectedConversation.fullname}</span>
          </div>
  
          <Messages/>
          <MessageInput/>
          </div>
        )}
     
        
    </div>
  )
}

export default MessageContainer


const NoChatSelected=()=>{
  const {authUser}=useAuthContext()
  return(
    <div className='flex item-center justify-content w-full h-full'>
      <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
        <p>Welcome {authUser.fullname} Start Message</p>
        <p>Select a chat to start chating</p>
        <TiMessages className='text-3xl md:text-6xl text-center'/>
      </div>
    </div>
  )
}