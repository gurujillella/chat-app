import React ,{useState}from 'react'
import { CiSearch } from "react-icons/ci";
import useConversation from '../zustand/useConversation';
import useGetConversation from '../Hooks/useGetConversation';
import toast from 'react-hot-toast'

const SearchInput = () => {

  const [search,setSearch]=useState("")
  const {setSelectedConversation}=useConversation()
  const {conversations}=useGetConversation()
  console.log(conversations)
  const handleSubmit=(e)=>{
    e.preventDefault()
    if(search.length<3) return toast.error("Atleast three chareacter");
    const conver=conversations.find((c)=>c.fullname.toLowerCase().includes(search.toLowerCase()))

    if(conver){
      setSelectedConversation(conver)
      setSearch("")
    }else{
      toast.error("no userfound")
    }
  }

  return (
    <form className='flex item-center gap-2' onSubmit={handleSubmit}>
        <input type="text" placeholder="search" value={search} className="input input-bordered rounded-full" onChange={(e)=>setSearch(e.target.value)}/>
        <button type="submit" className='btn btn-circle bg-sky-500 text-white'>
          <CiSearch className='w-6 h-6 outline-none'/></button>
    </form>
  )
}

export default SearchInput
