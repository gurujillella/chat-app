import React from 'react'
import useConversation from '../zustand/useConversation'
import { useSocketContext } from '../context/socketContent'

const Conversation = ({conversation}) => {
  const {selectedConversation,setSelectedConversation}=useConversation()
  const isselected=selectedConversation?._id===conversation._id
  console.log(conversation)
  console.log(selectedConversation)
  const {onlineUsers}=useSocketContext()
  const isOnline=onlineUsers.includes(conversation._id)
  return (
    <div className={`flex gap-2 item-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${isselected? "bg-sky-500":""}`} onClick={()=>setSelectedConversation(conversation)}>
       <div className={`avatar ${isOnline ? "online":""}`}>
            <div className="w-12 rounded-full">
                <img src={conversation.profilePic} alt="user avatar"/>
            </div>
       </div>

       <div className='flex flex-end flex-1'>
            <div className='flex gap-3 justify-between'>
                <p className='font-bold text-gray-200'>{conversation.fullname}</p>
                    <span className='text-lg'>$</span>
                
            </div>
       </div>

       <div className='divider my-0 py-0 '></div>

    </div>
  )
}

export default Conversation
