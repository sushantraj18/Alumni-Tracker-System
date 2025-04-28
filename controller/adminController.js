const uuid4 = require("uuid4");
const adminModel = require("../model/adminModel")
const {status,message}= require("../utils/statusMessage")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const moment = require("moment");
const eventModel = require("../model/eventModel");
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
        res.render("adminHome",{email:req.payload.email,message:""})

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

const adminAddEventController = async(req,res)=>{
    try{

        req.body.eventId = uuid4();
        req.body.uploadEventDate = moment(new Date()).format('DD-MM-YYYY');
        req.body.uploadEventTime = moment(new Date()).format('hh:mm:ss A')

        const eventDetails = await eventModel.create(req.body);
        res.render("adminAddEvent",{email:req.payload.email,message : message.EVENT_ADDED,status : ""})

        console.log(eventDetails)


    }catch(e){
        console.log("error in admin add event post method controller",e)
        res.render("adminHome",{message:message.EVENT_NOT_ADDED,email:req.payload.email,status : status.ERROR})
    }
}

const adminViewEventsController = async (req,res)=>{
    try{

        const eventListData = await eventModel.find({status:true});
        res.render("adminViewEvents",{eventList : eventListData.reverse(),message : "",status:status.SUCCESS,email:req.payload.email})

    }catch(e){
        console.log("error while fetching events list ", e )
        res.render("adminHome",{message:message.EVENT_LIST_ERROR,email:req.payload.email,status : status.ERROR})
    }
}

const adminDeleteEventController = async(req,res)=>{
    try{

        const eventId = req.body.eventId

        const updateStatus = {
            $set:{status:false}
        }

        const update = await eventModel.updateOne({eventId},updateStatus)
        
        const eventListData = await eventModel.find({status:true});
        res.render("adminViewEvents",{eventList : eventListData.reverse(),message : message.EVENT_DELETED,status:status.SUCCESS,email:req.payload.email})


    }catch(e){
        console.log("error while delete event" , e)
        res.render("adminHome",{message : message.EVENT_DELETED_ERROR,email:req.payload.email,status: status.ERROR})
    }
}

const adminUpdateEventController = async(req,res)=>{

    try{

        const eventId = req.body.eventId

       const eventData =  await eventModel.findOne({eventId})
       res.render("adminUpdateEvent",{eventData:eventData,message : "",email:req.payload.email,status : status.SUCCESS})

    }catch(e){
        console.log("error while update event list ",e)
        const eventListData = await eventModel.find({status:true});
        res.render("adminViewEvents",{eventList : eventListData.reverse(),message : message.SOMETHING_WENT_WRONG,status:status.ERROR,email:req.payload.email})

    }
}

const adminEventUpdateController = async(req,res)=>{
    try{

        const updateData = {
            $set : req.body
        }

        const updateResult = await eventModel.updateOne({eventId:req.body.eventId},updateData)
        console.log("update result => " , updateData )
        const eventListData = await eventModel.find({status:true});
        res.render("adminViewEvents",{eventList : eventListData.reverse(),message : message.EVENT_UPDATED_SUCCESS,status:status.SUCCESS,email:req.payload.email})


        

    }catch(e){
        console.log("error while admin event update ", e)
        const eventListData = await eventModel.find({status:true});
        res.render("adminViewEvents",{eventList : eventListData.reverse(),message : message.SOMETHING_WENT_WRONG,status:status.ERROR,email:req.payload.email})

    }
}


module.exports = {adminLogin,adminHome,adminAddEvent,adminAddEventController,adminViewEventsController , adminDeleteEventController,adminUpdateEventController,adminEventUpdateController}