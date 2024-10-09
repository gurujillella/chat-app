const jwt=require("jsonwebtoken")

const User=require('../models/user.js')

const protectRoute=async(req,res,next)=>{
    try{
        const token=req.cookies.jwt;
        if(!token){
           return res.status(400).json({
                error:"user is not login or register"
            })
        }

    const decode=await jwt.verify(token,"helloworld")
    if(!decode){
        return res.status(400).json({
            error:"user is not authorized"
        })
    }
    const user=await User.findOne({_id:decode.userId}).select("-password")
    if(!user){
        return res.status(400).json({
            error:"user not found"
        })
    }
    req.user=user;
    next();

    }
    catch(e){
        console.log("some error in the protected Route")
        console.log(e)
        res.status(400).json({
            error:"some error in the ProtectedRoute"
        })
    }

}

module.exports=protectRoute