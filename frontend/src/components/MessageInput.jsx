import React from 'react'
import { BiSend } from 'react-icons/bi'

const MessageInput = () => {
  return (
    <form className='px-4 my-3'>
        <div className='w-full relative'>
            <input type="text" className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 text-white' placeholder="Enter some Message"/>
            <button type='submit' className='absolute inset-y-1 end-0 flex items pe-3 my-2'><BiSend/></button>
        </div>
    </form>
  )
}

export default MessageInput
