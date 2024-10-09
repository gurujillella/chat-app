const User=require('../models/user.js')
module.exports.getuserSidebar=async(req,res)=>{
    try{
        const loggedInuserId=req.user._id
        const allUsers=await User.find({
            _id:{$ne:loggedInuserId}
        }).select("-password").select("-confirmPassword")
        return res.status(400).json(allUsers)

    }catch(e){
        console.log(e)
        res.status(400).json({
         error:"some error in the getuserSidebar"   
        })
    }
}