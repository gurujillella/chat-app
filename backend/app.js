// const express=require("express")
const dotenv = require('dotenv');
dotenv.config();

const express = require("express");
const { app, server } = require('./socket/socket.js');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const mongooseConnection = require("./mongooseconnection.js");
const authRouter = require("./routers/authRouter.js");
const messagesRouter = require("./routers/messagesRouter.js");
const userRouter = require("./routers/userRouter.js");
const path=require("path")

const port = process.env.PORT || 3000;
console.log("Port:", process.env.PORT);
console.log("MongoDB URL:", process.env.MONGO_DB_URL);

app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use(cookieParser())

app.use('/api/',userRouter)
app.use("/api/auth",authRouter)
app.use("/api/auth/messages",messagesRouter)

app.use(express.static(path.join(__dirname,"../frontend/dist")))
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend/dist","index.html"))
})
server.listen(port,()=>{
    mongooseConnection()
    console.log("port is listening",port)
})