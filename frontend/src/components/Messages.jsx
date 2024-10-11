import React, { useEffect, useRef } from 'react'
import Message from './Message'
import useGetMessages from '../Hooks/useGetMessages'
import useListenMessages from '../Hooks/useListenMessages'

const Messages = () => {
  const {messages,loading}=useGetMessages()
  console.log(messages)
  const lastmessageRef=useRef()
  useListenMessages()
  useEffect(()=>{
    setTimeout(()=>{
      lastmessageRef.current?.scrollIntoView({
        behavior:"smooth"
      })
    },50)
  },[messages])
  return (
    <div className="md:min-w-[450px] flex flex-col h-[500px] overflow-auto">
      {!loading && messages.length>0 && messages.map((message)=>(
        <div key={message._id} ref={lastmessageRef}>
        <Message  message={message} />
        </div>
      ))}
        {!loading && messages.length===0 && (
          <p className='text-center'>Send a Message to start the Conversataion</p>
        )}

    </div>
  )
}

export default Messages
