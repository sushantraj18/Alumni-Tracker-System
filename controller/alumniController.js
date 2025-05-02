const uuid4 = require("uuid4")

const alumniRegistrationController = async(req,res)=>{
    try{

        req.body.alumniId = uuid4()
        console.log(req.body.alumniId)
        console.log(req.files)
        console.log(req.body)
        console.log("inside alumni controller")

    }catch(e){
        console.log("Error in alumni registration ", e)
        res.render("home")
    }
}

module.exports = {alumniRegistrationController}