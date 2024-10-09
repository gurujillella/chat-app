const jwt=require("jsonwebtoken")

const generateToken=async(userId,res)=>{
    const token=jwt.sign({userId},"helloworld",{
        expiresIn:"30d"
    })
    res.cookie("jwt",token,{
        maxAge:15*24*60*60*1000,
        httpOnly:true,
        sameSite:"strict",
    })
}

module.exports=generateToken