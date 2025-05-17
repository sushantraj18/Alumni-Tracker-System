const express = require("express");
const {adminLogin,adminHome,adminAddEvent,adminAddEventController,adminViewEventsController,adminDeleteEventController,adminUpdateEventController,adminEventUpdateController,adminAlumniListController,adminVerifyAlumniController} = require("../controller/adminController")
const {status,message}= require("../utils/statusMessage")
const jwt = require("jsonwebtoken")
require("dotenv/config");

const adminRouter = express.Router()
adminRouter.use(express.static("public"))

const authenticateJWT = (req,res,next)=>{
    try{

        const token = req.cookies.admin_token

        if(!token){
            console.log("token error")
            res.render("adminLogin",{message :message.LOGIN_ISSUE,status:status.ERROR})
        }


        jwt.verify(token,process.env.ADMIN_SECRET_KEY,(error,payload)=>{
            if(error){
                console.log("error while verifying token ", error)
                res.render("adminLogin",{message :message.LOGIN_ISSUE,status:status.ERROR})

            }else{
                req.payload = payload
                next()

            }
        })


    }catch(e){
        console.log("error while admin authenticate JWT ", e)
        res.render("adminLogin",{message:message.SOMETHING_WENT_WRONG,status:status.ERROR})

    }
}

const authorizeJWT = (req,res,next)=>{

    try{

        if(req.payload.role === "admin"){
            next()
        }

    }catch(e){
        console.log("error while admin authorize JWT" , e)
        res.render("adminLogin",{message:message.SOMETHING_WENT_WRONG,status:status.ERROR})

    }
}


adminRouter.post("/adminLogin",adminLogin)
adminRouter.get("/adminHome",authenticateJWT,authorizeJWT,adminHome)
adminRouter.get("/adminAddEvent",authenticateJWT,adminAddEvent)
adminRouter.post("/adminAddEvent",authenticateJWT,adminAddEventController)
adminRouter.get("/adminViewEvents",authenticateJWT,adminViewEventsController)
adminRouter.post("/adminDeleteEvent",authenticateJWT,adminDeleteEventController)
adminRouter.post("/adminUpdateEvent",authenticateJWT,adminUpdateEventController)
adminRouter.post("/adminEventUpdate",authenticateJWT,adminEventUpdateController)
adminRouter.get("/adminAlumniList",authenticateJWT,adminAlumniListController)
adminRouter.post("/adminVerifyAlumni",authenticateJWT,adminVerifyAlumniController)


module.exports = adminRouter    