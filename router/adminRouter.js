const express = require("express");
const adminLogin = require("../controller/adminController")

const adminRouter = express.Router()
adminRouter.use(express.static("public"))

adminRouter.post("/adminLogin",adminLogin)

module.exports = adminRouter