import React from 'react'
import {Link} from 'react-router-dom'
import { useState } from 'react'
import Gendercheckbox from './Gendercheckbox'
import userSignup from '../../Hooks/userSignup'

const Signup = () => {
    const [input,setInput]=useState({
        fullname:"",
        username:"",
        password:"",
        confirmPassword:"",
        gender:""
    })
    const {loading,signup}=userSignup()
    const submitform=async(e)=>{
        e.preventDefault()
        console.log(input)
        await signup(input)
    }

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
    <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>welcome to Signup</h1>
        <form onSubmit={submitform}>
            <div>
                <label className='label p-2'>
                    <span className='text-base label-text'>Fullname</span>
                </label>
                <input type='text' value={input.fullname} placeholder='Enter Fullname' className='w-full input input-bordered h-10' onChange={(e)=>setInput({...input,fullname:e.target.value})}/>
            </div>

            <div>
                <label className='label p-2'>
                    <span className='text-base label-text'>Username</span>
                </label>
                <input type='text'  value={input.username} placeholder='Enter Username' className='w-full input input-bordered h-10' onChange={(e)=>setInput({...input,username:e.target.value})}/>
            </div>
            <div>
                <label className='label p-2'>
                    <span className='text-base label-text'>Password</span>
                </label>
                <input type='password' value={input.password} placeholder='Enter Password' className='w-full input input-bordered h-10' onChange={(e)=>setInput({...input,password:e.target.value})}/>
            </div>
            <div>
                <label className='label p-2'>
                    <span className='text-base label-text'>Confirm password</span>
                </label>
                <input type='password' placeholder='Enter Confirm Password' value={input.confirmPassword} className='w-full input input-bordered h-10' onChange={(e)=>setInput({...input,confirmPassword:e.target.value})}/>
            </div>
            {/*gender check box*/}
            <Gendercheckbox  input1={input} setInput1={setInput}/>

            <Link to={"/signin"} className='text-sm hover:underline hover:text-blue-600 mt-4 inline-block'> Already have an account</Link>
            <div>
                <button className='btn btn-block btn-sm mt-2' disabled={loading}>{loading?<span className='loading loading-spinner'></span>:"Sign Up"}</button>
            </div>
        </form>
    </div>
</div>
)
}

export default Signup
