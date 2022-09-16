import { PrismaClient } from "@prisma/client";
import userprofileServices from "../../services/userprofile.js"

const prisma = new PrismaClient();


//Verify_If_Verifiy_Account_Not_Sent
const  confirmNewPasswordMiddleware = async ( req, res, next) => {

try{
        if(req.body.newPassword==req.body.confirmNewPassword){
            next();
        }

        else if (req.body.newPassword!=req.body.confirmNewPassword){
            res.status(404).send("Passwords don't match")
        }

    }    catch(err) {
        res.status(404).send("Passwords don't match")
    }
    
    }
       
  export default confirmNewPasswordMiddleware;