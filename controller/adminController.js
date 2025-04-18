const adminModel = require("../model/adminModel")
const {status,message}= require("../utils/statusMessage")
const bcrypt = require("bcrypt")
const adminLogin = async(req,res)=>{
    try{
        const{email,password} = req.body
       
        const isAdminEmailValid = await adminModel.findOne({email})
        const adminEmail = isAdminEmailValid
        const adminPassword = isAdminEmailValid.password
        if(!adminEmail){
            res.render('adminLogin',{message :message.ADMIN_LOGIN_ERROR,status:status.ERROR })
            return
            
        }
        const passCheck = await bcrypt.compare(password,adminPassword)
        if(passCheck){
            res.render('adminHome')
        }else{
            res.render('adminLogin',{message :message.ADMIN_LOGIN_ERROR,status:status.ERROR })
        }

    }catch(e){
        console.log("error in admin login",e)
        res.render("adminLogin",{message:message.SOMETHING_WENT_WRONG,status : status.ERROR})
    }
}

module.exports = adminLogin