const mongoose=require("mongoose")


const mongooseConnection=async()=>{
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/Whatsapp')
    }catch(e){
        console.log("error in the mongoose connection")
    }
}

module.exports=mongooseConnection