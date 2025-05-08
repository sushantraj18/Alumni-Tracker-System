const uuid4 = require("uuid4")
const mailer = require("./mailer")
const { message, status } = require("../utils/statusMessage")
const path = require("path")
const { fileURLToPath } = require("url")
const alumniModel = require('../model/alumniModel')

 

const alumniRegistrationController = async(req,res)=>{
    try{

        console.log("inside controller")
        console.log(req.body)
        req.body.alumniId = uuid4()
        const __dirname = path.dirname(__filename)
        console.log(__dirname)
        const filename = req.files.profile
        const fileName = new Date().getTime()+filename.name
        req.body.profile = filename.name
        console.log("filename ", filename)
        const pathName = path.join(__dirname.replace("\\controller","")+'/public/document/'+fileName)



        mailer.mailer(req.body.email,(value)=>{
            if(value){
                
             filename.mv(pathName, async(error)=>{


                try{

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

        const emailVerify = req.body.emailVerify

        const verifyEmail = {
            $set:{emailVerify : "Verified"}
        }

        const verfiy = await alumniModel.updateOne({emailVerify},verifyEmail)
        console.log("email verify success ", verfiy)
        res.render("alumniLogin",{message : message.ALUMNI_EMAIL_VERIFY_SUCCESS,status:status.SUCCESS})

    }catch(e){
        console.log("error while alumni email verify ", e)
        res.render("alumniLogin",{message : message.ALUMNI_EMAIL_VERIFY_ERROR,status:status.ERROR})


    }
}

module.exports = {alumniRegistrationController,alumniEmailVerifyController}