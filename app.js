 const express = require("express")
 require("dotenv/config")
 const adminRouter = require("./router/adminRouter")
 const initializeAdminData = require("./utils/adminUtils")
const dbConnect = require("./database/db")
 const app = express()
 dbConnect()
  initializeAdminData()

 const PORT = process.env.PORT || 3000


 app.set("view engine","ejs")
 app.use(express.urlencoded({extended:true}))
 app.use(express.json())
 app.use(express.static("public"))

 app.get("/",(req,res)=>{
    res.render("home")
 })

 app.get("/adminLogin",(req,res)=>{
   res.render("adminLogin",{message:"",status : ""})
 })

 app.use("/admin",adminRouter)

 app.listen(PORT,()=>{
    console.log(`server running at http://localhost:${PORT}`)
 })

 