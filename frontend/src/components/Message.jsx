import React from 'react'
import { useAuthContext } from '../context/Authcontext'
import useConversation from '../zustand/useConversation'
import { extractTime } from '../utils/extractTime'

const Message = ({message}) => {
    const {authUser}=useAuthContext()
    const {selectedConversation}=useConversation()
    const fromMe=message.senderId===authUser._id
    const chatClassName=fromMe?"chat-end":"chat-start"
    const formatedTime=extractTime(message.createdAt)
    //const ProfilePic=fromMe?authUser.profilePic:selectedConversation.profilePic
    console.log(selectedConversation)
    const bubblebgcolor=fromMe?"bg-blue-500":""
  return (
    <div>
      <div className={`chat ${chatClassName}`}>
        <div className="chat-image avatar">
            <div className="w-10 rounded-full">
            <img
                alt="Tailwind CSS chat bubble component"
                src={authUser.profilePic}/>
            </div>
        </div>
        <div className="chat-header">
            <time className="text-xs opacity-50">{formatedTime}</time>
        </div>
        <div className={`chat-bubble text-white ${bubblebgcolor}`}>{message.message}</div>
        <div className="chat-footer opacity-50">Delivered</div>
        </div>
       
    </div>
  )
}

export default Message
