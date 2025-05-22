const express = require("express")
const {alumniRegistrationController,alumniEmailVerifyController,alumniLoginController,alumniJobFormController,alumniHomeController,alumniJobPostingController} = require("../controller/alumniController")
const { message, status } = require("../utils/statusMessage")
const alumniRouter = express.Router()
const jwt = require("jsonwebtoken")
alumniRouter.use(express.static("public"))

const authenticateJWT = (req,res,next)=>{

    try{

        const token = req.cookies.alumni_token

        if(!token){
            console.log("token error alumni")
            res.render("alumniLogin",{message : message.LOGIN_ISSUE,status:status.ERROR})
        }

        jwt.verify(token,process.env.ALUMNI_SECRET_KEY,(error,payload)=>{

            if(error){
                console.log("error while verifying token ", error)
                res.render("alumniLogin",{message :message.LOGIN_ISSUE , status:status.ERROR})
            }else{
                req.payload = payload
                next()
            }
        })



    }catch(e){

        console.log("error while alumni authenticate JWT ", e)
        res.render("alumniLogin",{message:message.SOMETHING_WENT_WRONG,status:status.ERROR})

    }
}

const authorizeJWT = (req,res,next)=>{

    try{

        if(req.payload.role==="alumni")
            next()

    }catch(e){
        
        console.log("error while alumni authorize JWT" , e)
        res.render("alumniLogin",{message:message.SOMETHING_WENT_WRONG,status:status.ERROR})
    }
}



alumniRouter.get("/alumniHome",authenticateJWT,authorizeJWT,alumniHomeController)
alumniRouter.get("/alumniJobForm",authenticateJWT,authorizeJWT,alumniJobFormController)

alumniRouter.get("/alumniLogin",(req,res)=>{
    res.render("alumniLogin",{message : "",status : ""})
})

alumniRouter.get("/alumniRegistration",(req,res)=>{
    res.render("alumniRegistration",{message : "",status : ""})
})

alumniRouter.post("/alumniRegistration",alumniRegistrationController)
alumniRouter.post("/alumniEmailVerify",alumniEmailVerifyController)
alumniRouter.post("/alumniLogin",alumniLoginController)
alumniRouter.post("/alumniJobPosting",authenticateJWT,alumniJobPostingController)

module.exports = alumniRouter