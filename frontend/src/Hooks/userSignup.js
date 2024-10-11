import { useState } from "react"
import toast from 'react-hot-toast'
import { useAuthContext } from "../context/Authcontext"
const userSignup=()=>{
    const [loading ,setLoading]=useState(false)
    const {authUser,setAuthUser}=useAuthContext()
    const  signup=async({fullname,username,password,confirmPassword,gender})=>{
       const success= handleInputError({fullname,username,password,confirmPassword,gender})
       if(!success) return;
       try{
        const res=await fetch("/api/auth/register",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({fullname,username,password,confirmPassword,gender})
        })
        const data=await res.json();
        console.log(data)
        if(data.error){
            throw new Error(data.error)
        }
        localStorage.setItem("chat-user",JSON.stringify(data))
        setAuthUser(data)
       }catch(error){
        toast.error(error.message)
       }finally{
        setLoading(false)
       }

    }
    return {loading,signup}
}

export default userSignup


function handleInputError({fullname,username,password,confirmPassword,gender}){
    if(!fullname || !username || !password || !confirmPassword ||!gender){
        toast.error("please fill all fields")
        return false;
    }
    if(password!==confirmPassword){
        toast.error("password do not match")
        return false 
    }
    if(password.length<6){
        toast.error("password must be at least 6 characters")
        return false;
    }
    return true;
}

