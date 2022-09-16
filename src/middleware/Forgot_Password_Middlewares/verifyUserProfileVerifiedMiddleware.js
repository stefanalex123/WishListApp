import { PrismaClient } from "@prisma/client";
import userprofileServices from "../../services/userprofile.js"

const prisma = new PrismaClient();


//Verify_If_Verifiy_Account_Not_Sent
const  verifyUserProfileVerifiedMiddleware = async ( req, res, next) => {

try{

    const userprofile=await userprofileServices.getUserProfileByEmail(req.body.email)

    if(userprofile.verifiedAccount=="UNVERIFIED"){
        res.status(403).send("You didn't have a verified account")
    }

    else if (userprofile.verifiedAccount=="VERIFIED"){
        next();
    }
      

      

    }    catch(err) {
         res.status(404).send("This email doesn't exist")
    }
    
    }
       
  export default verifyUserProfileVerifiedMiddleware;