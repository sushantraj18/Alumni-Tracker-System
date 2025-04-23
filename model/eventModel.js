const mongoose = require("mongoose")

const eventSchema = mongoose.Schema({
    eventId : {
        type:String,
        required : true,
    },
    eventName : {
        type :String,
        required : true,
    },
    eventStartDate : {
        type :   String,
        required : true,

    },
    eventEndDate  : {
        type : String,
        required : true,
    },
    eventStartTime : {
        type : String,
        required : true,

    },
    eventEndTime : {
        type : String,
        required : true,

    },
    location : {
        type : String,
        required : true,
    },
    description :{
        type : String,
        required : true,

    },
    typeOfEvent : {
        type :String,
        required : true,
    },
    criteria :{ 
        type : String,
        required : true,
    },
    modeOfApply : {
        type : String,
        required : true,
    },
    startDateToApply : {
        type : String,
        required : true,

    },
    lastDateToApply : {
        type : String,
        required : true,
    },
    
    uploadEventDate : {
        type : String,
        required : true,

    },
    uploadEventTime : {
        type : String,
        required : true,
    },
    status :{
        type : Boolean,
        required : true
    }

},{Timestamp : true})


const eventModel = mongoose.Model("event",eventSchema)

module.exports = eventModel;