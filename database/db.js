const mongoose = require("mongoose")

const dbConnect = async ()=>{
    try{
        const connect = await mongoose.connect(process.env.MONGO_URI)
        if(connect){
            console.log("db connected")
        }else{
            console.log("db connection failed")
        }

    }catch(e){
        console.log("error while connecting to database " , e)
    }
}

module.exports = dbConnect