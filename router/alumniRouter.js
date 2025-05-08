const express = require("express")
const {alumniRegistrationController,alumniEmailVerifyController} = require("../controller/alumniController")
const alumniRouter = express.Router()
alumniRouter.use(express.static("public"))
alumniRouter.get("/alumniLogin",(req,res)=>{
    res.render("alumniLogin",{message : "",status : ""})
})

alumniRouter.get("/alumniRegistration",(req,res)=>{
    res.render("alumniRegistration",{message : "",status : ""})
})

alumniRouter.post("/alumniRegistration",alumniRegistrationController)
alumniRouter.post("/alumniEmailVerify",alumniEmailVerifyController)

module.exports = alumniRouter