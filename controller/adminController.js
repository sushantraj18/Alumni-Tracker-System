const adminModel = require("../model/adminModel")
const {status,message}= require("../utils/statusMessage")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv/config");
const adminLogin = async(req,res)=>{
    try{
        const{email,password} = req.body
       
        const isAdminEmailValid = await adminModel.findOne({email})
        const adminEmail = isAdminEmailValid
        
        if(!adminEmail){
            res.render('adminLogin',{message :message.ADMIN_LOGIN_ERROR,status:status.ERROR })
            return
            
        }
        const passCheck = await bcrypt.compare(req.body.password,isAdminEmailValid.password)
        if(passCheck){

            const adminPayload = {
                email : req.body.email,
                role : "admin"
            }

            const token = jwt.sign(adminPayload,process.env.ADMIN_SECRET_KEY,{expiresIn:"1d"})
            res.cookie("admin_token",token,{httpOnly:true,maxAge: 24 * 60 * 60 * 1000})
            res.redirect('/admin/adminHome');

        }else{
            res.render('adminLogin',{message :message.ADMIN_LOGIN_ERROR,status:status.ERROR })
        }

    }catch(e){
        console.log("error in admin login",e)
        res.render("adminLogin",{message:message.SOMETHING_WENT_WRONG,status : status.ERROR})
    }
}


const adminHome = async(req,res)=>{
    try{
        res.render("adminHome",{email:req.payload.email})

    }catch(e){

        console.log("error in admin home controller ", e)
        res.render("adminLogin",{message:message.SOMETHING_WENT_WRONG,status : status.ERROR})

    }
}


const adminAddEvent = async(req,res)=>{
    try{
        res.render("adminAddEvent",{email:req.payload.email,message : "",status : ""})

    }catch(e){
        
        console.log("error in admin add event controller ", e)
        res.render("adminHome",{message:message.SOMETHING_WENT_WRONG,email:req.payload.email,status : status.ERROR})
    }
}
module.exports = {adminLogin,adminHome,adminAddEvent}