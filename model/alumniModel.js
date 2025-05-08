const mongoose = require("mongoose")

const alumniSchema = mongoose.Schema({

    alumniId : {
        type : String,
        required : true
    },
    userName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    contact : {
        type : String,
        required : true
    },
    dateOfBirth : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    passOutYear:{
        type : Number ,
        required : true
    },
    stream:{
        type : String,
        required : true
    },
    branch :{
        type : String,
        required : true
    },
    experience:{
        type : String,
        required : true
    },
    currentCompany : {
        type : String,
        required : true
    },
    designation :{
        type : String,
        required : true
    },
    profile :{
        type : String,
        required : true
    },
    linkedInProfileLink : {
        type : String,
        required : true
    },
    emailVerify : {
        type : String,
        required : true,
        default : "Not Verified", 
    },
    adminVerify : {
        type : String,
        required : true,
        default : "Not Verified",
    },
    status : {
        type : Boolean,
        default : true,
    }
    
 
},)

const alumniModel = mongoose.model("alumni",alumniSchema)


module.exports = alumniModel