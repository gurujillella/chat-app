const express=require("express")
const {app,server} =require('./socket/socket.js')
const { default: mongoose } = require('mongoose')
const cookiePraser=require("cookie-parser")
const dotenv=require('dotenv')
const mongooseConnection=require("./mongooseconnection.js")
const authRouter=require("./routers/authRouter.js")
const messagesRouter=require("./routers/messagesRouter.js")
const userRouter=require("./routers/userRouter.js")



dotenv.config()


app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use(cookiePraser())

app.use('/api/',userRouter)
app.use("/api/auth",authRouter)
app.use("/api/auth/messages",messagesRouter)



server.listen(3000,()=>{
    mongooseConnection()
    console.log("port is listening")
})