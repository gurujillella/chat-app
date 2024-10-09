const mongoose=require('mongoose')
const Schema=mongoose.Schema


const messagesmodel=new Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    message:{
        type:String,
        required:true
    }
},{timestamps:true})


const Message=mongoose.model("Message",messagesmodel)
module.exports=Message