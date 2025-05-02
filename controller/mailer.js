const nodemailer = require("nodemailer")

const mailer = (email,callback)=>{
    const transport = nodemailer.createTransport({
        service : 'gmail',
        auth : {
            user : process.env.MY_MAIL,
            pass : process.env.MY_PASS
        }
    })


    const mailOption = {
        from : process.env.MY_MAIL,
        to : email,
        subject : `hello ${email} this is verification mail from alumni tracker system please click below link to verfiy <br>
        
        <form action="" method="post" 
        <input type="hidden" name='email' id='email' value='${email}'>
        <button>Click here to verify</button>
        </form>
        ` 

         
    }

    transport.sendMail(mailOption,(error,info)=>{
        if(error){
            console.log("error while sending mail ", error)
            callback(false)
        }else{
            console.log("mail from mailer send success")
            callback(info)
        }
    })
}

module.exports = {mailer:mailer}