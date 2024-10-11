import React from 'react'
import Sidebar from '../../components/Sidebar'
import MessageContainer from '../../components/MessageContainer'


const Home = () => {
  return (
    <div className="flex items-center  justify-center min-w-96 mx-auto sm:h-[550px] md:h-[600px] rounded-xl overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <Sidebar/>
      <MessageContainer/>
    </div>
  )
}

export default Home
