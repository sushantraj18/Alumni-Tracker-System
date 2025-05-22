const uuid4 = require("uuid4")
const mailer = require("./mailer")
const { message, status } = require("../utils/statusMessage")
const path = require("path")
const { fileURLToPath } = require("url")
const alumniModel = require('../model/alumniModel')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { error } = require("console")

 

const alumniRegistrationController = async(req,res)=>{
    try{

        console.log("inside controller")
        console.log(req.body)
        req.body.alumniId = uuid4()
        const __dirname = path.dirname(__filename)
        console.log(__dirname)
        const filename = req.files.profile
        const fileName = new Date().getTime()+filename.name
        req.body.profile = fileName
        const pathName = path.join(__dirname.replace("\\controller","")+'/public/document/'+fileName)



        mailer.mailer(req.body.email,(value)=>{
            if(value){
                
             filename.mv(pathName, async(error)=>{


                try{

                    req.body.password = await bcrypt.hash(req.body.password,10)
                    const alumniData = await alumniModel.create(req.body)
                    console.log("alumni data => " , alumniData)
                    res.render("alumniLogin",{message : message.WAIT_FOR_ADMIN_APPROVAL,status:status.ERROR})

                }catch(e){
                console.log("error while uploading profile image ", e)
                res.render("alumniRegistration",{message:message.ERROR_PROFILE_UPLOAD,status : status.ERROR})

                }
            
        })

            }else{
                console.log("error while sending mail")
                res.render("alumniRegistration",{message:message.MAIL_SENDING_ERROR,status : status.ERROR})
            }
        })


    }catch(e){
        console.log("Error in alumni registration ", e)
        res.render("home")
    }
}


const alumniEmailVerifyController = async(req,res)=>{

    try{

        const email = req.body.email

        const updateEmail = {
            $set:{emailVerify : "Verified"}
        }

        const verfiy = await alumniModel.updateOne({email},updateEmail)
        res.render("alumniLogin",{message : message.ALUMNI_EMAIL_VERIFY_SUCCESS,status:status.SUCCESS})

    }catch(e){
        console.log("error while alumni email verify ", e)
        res.render("alumniLogin",{message : message.ALUMNI_EMAIL_VERIFY_ERROR,status:status.ERROR})


    }
}

const alumniLoginController =  async(req,res)=>{

    try{

        const {email,password}= req.body

        const isAlumniValid = await alumniModel.findOne({email})

        if(!isAlumniValid){
            res.render("alumniLogin",{message : message.ALUMNI_LOGIN_ERROR,status : status.SUCCESS})
            return
        }

        const passCheck = await bcrypt.compare(password,isAlumniValid.password)

        if(!passCheck ){
            res.render("alumniLogin",{message : message.ALUMNI_LOGIN_ERROR,status : status.SUCCESS})
            return
        }

        if(!isAlumniValid.status){
            res.render("alumniLogin",{message : message.ACCOUNT_DEACTIVATED,status : status.SUCCESS})
            return
        }

        const alumniPayload = {
            email : req.body.email,
            username  : isAlumniValid.userName,
            role :"alumni",
        }

        const token = jwt.sign(alumniPayload,process.env.ALUMNI_SECRET_KEY,{expiresIn:"1d"})

        res.cookie("alumni_token",token,{httpOnly:true,maxAge:24*60*60*1000})
        res.redirect("/alumni/alumniHome")

        


    }catch(e){

        console.log("error in alumni login controller ",e)
         res.render("alumniLogin",{message : message.SOMETHING_WENT_WRONG,status : status.ERROR})

    }
}


const alumniHomeController = async(req,res)=>{
    try{

     res.render("alumniHome",{email:req.payload.email,message:""})


    }catch(e){
        console.log("error in alumni home " , e)
         res.render("alumniLogin",{message : message.SOMETHING_WENT_WRONG,status : status.ERROR})
    }
}


const alumniJobFormController = async(req,res)=>{
    try{

     res.render("alumniJobForm",{email:req.payload.email,message:""})

    }catch(e){
        console.log("error in alumni job form controller ",e)
         res.render("alumniHome",{email:req.payload.email,message:message.SOMETHING_WENT_WRONG,status:status.ERROR})


    }
}


const alumniJobPostingController = async(req,res)=>{
    try{

        console.log("result  ", req.body)

    }catch(e){
        console.log("error in alumni job posting controller ", e)
        res.render("alumniJobForm",{email:req.payload.email,message:message.SOMETHING_WENT_WRONG,status:status.ERROR})


    }
}

module.exports = {alumniRegistrationController,alumniEmailVerifyController,alumniLoginController,alumniHomeController,alumniJobFormController,alumniJobPostingController}