import { PrismaClient } from "@prisma/client";
import userprofileServices from "../../services/userprofile.js"

const prisma = new PrismaClient();


//Verify_If_Verifiy_Account_Not_Sent
const  verifyAccountNotSentAndAccountUnverifiedMiddleware= async ( req, res, next) => {


const userprofile=await userprofileServices.getUserProfile(req.auth.userId)
if(userprofile==null){
    res.send("Complete user profile first")
}




try{
if(userprofile.verifiedAccount=="UNVERIFIED"){
    const verifyAccount= await prisma.verifyAccount.findMany({
        where: {
        emailUsed:userprofile.email
        },
    })



        if(verifyAccount[0].emailUsed==userprofile.email && verifyAccount[0].status=="PENDING"){
            res.send("The verify Account is already sent")
        }

         else if (verifyAccount[0].emailUsed==userprofile.email && verifyAccount[0].status=="EXPIRED"){
            next();
            }
     }

    else {
        res.send("This account is already verified")
    }

    }    catch(err) {
         next();
    }
    
    }
       
       
       
     
    

  

  
   

  
  export default verifyAccountNotSentAndAccountUnverifiedMiddleware;