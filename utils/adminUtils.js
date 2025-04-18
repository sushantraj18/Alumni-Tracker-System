const adminModel = require("../model/adminModel")
const bcrypt = require("bcrypt")
const {message,status} = require("./statusMessage")

const initializeAdminData = async(req,res)=>{
    try{

        const isAdminAvailabe = await adminModel.find()

        if(isAdminAvailabe.length === 0){
            console.log("admin credential is going to be inserted...")
            const adminData = {
                email : "admin@gmail.com",
                password : await bcrypt.hash("123",10)
            }

            await adminModel.create(adminData)
            console.log("admin credential inserted")

        }else{
            console.log("admin Credential already available")
        }
        return true

    }catch(e){
        console.log("error while initialize admin data ", e.message )
        // res.render("adminLogin",{message : message.ADMIN_CREDENTIAL_ERROR,status : status.ERROR})
        return false
    }
}

module.exports = initializeAdminData