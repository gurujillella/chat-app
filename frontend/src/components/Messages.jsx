import React from 'react'
import Message from './Message'

const Messages = () => {
  return (
    <div className="md:min-w-[450px] flex flex-col h-[500px] overflow-auto">

        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
    </div>
  )
}

export default Messages
