const mongoose=require("mongoose")


const Schema=mongoose.Schema

const participantsModel=new Schema({
    participants:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    messages:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Message",
            default:[]
        }
    ]
},{timestamps:true})

const Conversation=mongoose.model("Conversation",participantsModel)

module.exports=Conversation