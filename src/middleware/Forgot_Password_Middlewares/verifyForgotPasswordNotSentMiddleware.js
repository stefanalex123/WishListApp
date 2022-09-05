import { PrismaClient } from "@prisma/client";
import userprofileServices from "../../services/userprofile.js"

const prisma = new PrismaClient();


//Verify_If_Verifiy_Account_Not_Sent
const  verifyForgotPasswordNotSentMiddleware = async ( req, res, next) => {

try{

    const forgotPassword= await prisma.mailsForgotPassword.findMany({
        where: {
        emailUsed:req.body.email
        },
    })


        if(forgotPassword[0].emailUsed==req.body.email && verifyAccount[0].status=="PENDING"){
            res.send("The Forgot Password request is already sent")
        }

         else if (forgotPassword[0].emailUsed==req.body.email && forgotPassword[0].status=="EXPIRED"){
            next();
            }
     

    }    catch(err) {
         next();
    }
    
    }
       
  export default verifyForgotPasswordNotSentMiddleware;