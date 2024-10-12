const mongoose=require("mongoose")
const dotenv=require("dotenv")

dotenv.config()

const mongooseConnection=async()=>{
    try{
        console.log(process.env.PORT)
        console.log(process.env.MONGO_DB_URL)
        await mongoose.connect(process.env.MONGO_DB_URL)
        console.log("connected to mongo")
    }catch(e){
        console.log("error in the mongoose connection")
    }
}

module.exports=mongooseConnection