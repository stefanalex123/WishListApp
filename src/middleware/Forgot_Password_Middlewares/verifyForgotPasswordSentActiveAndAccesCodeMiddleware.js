import { PrismaClient } from "@prisma/client";
import userprofileServices from "../../services/userprofile.js"
import bcrypt from "bcrypt";
import forgotpassword from "../../services/forgotpassword.js";

const prisma = new PrismaClient();



const  verifyForgotPasswordSentActiveAndAccesCodeMiddleware= async ( req, res, next) => {
try{
    const forgotPassword= await prisma.mailsForgotPassword.findMany({
        where: {
        id:req.params.forgotPasswordId
        },
    })

    


    const validCode = await bcrypt.compare(req.body.code, forgotPassword[0].code);

        if(forgotPassword[0].id==req.params.forgotPasswordId && forgotPassword[0].status=="EXPIRED"){
            res.send("The Forgot Password Request is expired")
        }

         else if (forgotPassword[0].id==req.params.forgotPasswordId && forgotPassword[0].status=="PENDING"
              &&  validCode==true){
            next();
            }

        else if (forgotPassword[0].id==req.params.forgotPasswordId && forgotPassword[0].status=="PENDING"
            &&  validCode==false){
                res.send("Code invalid")
          }
      
        
    

    }catch(err) {
        res.send("The Forgot Password Invitation doesn't exists")
        console.log(err)
    }
    
    }
       
       
       
     
    

  

  
   

  
  export default verifyForgotPasswordSentActiveAndAccesCodeMiddleware;