    import {createTransport} from 'nodemailer'
    import {EMAIL_PASS,EMAIL_USER} from '../config/key'
    export async function sendEmail(to,title,description){
        console.log(`inside emailConfig pass ${EMAIL_PASS} user ${EMAIL_USER}`)
        let transporter = createTransport({
        host:"smtp.gmail.com",
        port:465,
        secure:true,
        service:"gmail",
        auth:{
            user:EMAIL_USER,
            pass:EMAIL_PASS
        }
        })

        let mailOptions={
            from: EMAIL_USER,
            to:to,
            subject:title,
            html:description
        }

        try{
            let transport = await transporter.sendMail(mailOptions)
            return "Success"
        }catch(e){
            return `Failure ${e}`
        }
    }
