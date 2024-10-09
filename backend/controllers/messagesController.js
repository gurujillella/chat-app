const Conversation = require("../models/participants");
const Message=require("../models/messages")

module.exports.sendMessage=async(req,res)=>{
    try{
    const {message}=req.body
    const {id:receiverId}=req.params;
    const senderId=req.user._id
    let conversation=await Conversation.findOne({
        participants:{
            $all:[senderId,receiverId]
        }
    })
    if(!conversation){
        conversation=await Conversation.create({
            participants:[senderId,receiverId],
        })
    }
    const  newmessage=await new Message({
        senderId,
        receiverId,
        message
    })
    
    if(newmessage){
        conversation.messages.push(newmessage._id)
    }
    await Promise.all([conversation.save(),newmessage.save()])
    res.status(200).json(newmessage)
    
    }catch(e){
        console.log(e)
        res.status(400).json({
            error:"some error in the sending message"
        }
    )}
}

module.exports.getMessages=async(req,res)=>{
    try{
        const {id:userChatId}=req.params
        const senderId=req.user._id
        const conversation=await Conversation.findOne({
            participants:[senderId,userChatId]
        }).populate('messages')
        const messages=conversation.messages
        res.status(200).json(messages)
    }catch(e){
        console.log(e)
        res.status(400).json({
            error:"some error in the getting messages message"
        })
        }
}