import React from 'react'
import { CiSearch } from "react-icons/ci";

const SearchInput = () => {
  return (
    <div className='flex item-center gap-2'>
        <input type="text" placeholder="search" className="input input-bordered rounded-full"/>
        <button type="submit" className='btn btn-circle bg-sky-500 text-white'><CiSearch className='w-6 h-6 outline-none'/></button>
    </div>
  )
}

export default SearchInput
