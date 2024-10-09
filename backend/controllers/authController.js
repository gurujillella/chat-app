const bcrypt=require("bcrypt")
const User=require("../models/user.js")
const generateToken=require('../utils/generateJwtToken.js')


module.exports.login=async(req,res)=>{
   try{
    const {username,password}=req.body;
    if(!username || !password){
        return res.status(400).json({
            error:"All fileds are required"
        })
    }
    const user=await User.findOne({username})
    if (!user){
        return res.status(400).json({
            error:"user not exist"
        })
    }
    const comparepassword=await bcrypt.compare(password,user.password);
    console.log(comparepassword)
    if(!comparepassword){
        return res.status(400).json({
            error:"password wrong"
        })
    }
    generateToken(user._id,res);
    res.status(200).json({
        _id:user._id,
        fullname:user.fullname,
        username:user.username,
        profilePic:user.profilePic 

    })


   }catch(e){
    console.log(e)
    return res.status(400).json("some error in the login") }

}

module.exports.logout=async(req,res)=>{
    res.cookie("jwt","",{maxAge:0});
    res.status(200).json({message:"Logged out Successfully"})
}

module.exports.register=async(req,res)=>{
    try{
    const {fullname,username,password,confirmPassword,gender}=req.body;
    if(!fullname || !username || !password || !confirmPassword || !gender){
        return res.status(400).json({
        error:"All fields are required"})
    }
    if(password!==confirmPassword){
        return res.status(400).json({
            error:"password and confirm password are not matched"
        })
    }
    const user=await User.findOne({username})
    if(user){
       return res.status(400).json({
            error:"User already exist"
        })
    }  
    //https://avatar.iran.liara.run/public/boy
    //https://avatar.iran.liara.run/public/girl 
    const boyProfilepic='https://avatar.iran.liara.run/public/boy'
    const girlProfilepic='https://avatar.iran.liara.run/public/girl'
    const hashedpassowrd=await bcrypt.hash(password,10)
    const newuser=await new User({
        fullname,
        username,
        password:hashedpassowrd,
        confirmPassword:hashedpassowrd,
        gender,
        profilePic:gender==="male"?boyProfilepic:girlProfilepic

    })
    await newuser.save()
    
    generateToken(newuser._id,res)
    res.status(200).json({
        _id:newuser._id,
        fullname:newuser.fullname,
        username:newuser.username,
        profilePic:newuser.profilePic 

    })

    
   }catch(e){
    return res.status(400).json("some error in the login") }

}

