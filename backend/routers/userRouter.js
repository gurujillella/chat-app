const express=require('express')
const router=express.Router()
const protectRoute=require("../middleware/protectRoute.js")
const {getuserSidebar} =require('../controllers/userController.js')



router.get('/users',protectRoute,getuserSidebar)
module.exports=router;