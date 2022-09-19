import { PrismaClient } from "@prisma/client";
import userprofileServices from "../../services/userprofile.js"
import bcrypt from "bcrypt";

const prisma = new PrismaClient();



const  verifyAccountSentActiveAndAccesCodeMiddleware= async ( req, res, next) => {
try{
    const verifyAccount= await prisma.verifyAccount.findMany({
        where: {
        id:req.params.verifyAccountId
        },
    })

    console.log(verifyAccount)

    const validCode = await bcrypt.compare(req.body.code, verifyAccount[0].code);

        if(verifyAccount[0].id==req.params.verifyAccountId && verifyAccount[0].status=="EXPIRED"){
            res.status(409).send("The Invitation is expired")
        }

         else if (verifyAccount[0].id==req.params.verifyAccountId && verifyAccount[0].status=="PENDING"
              &&  validCode==true){
            next();
            }
        else if (verifyAccount[0].id==req.params.verifyAccountId && verifyAccount[0].status=="PENDING"
            &&  validCode==false){
                res.status(400).send("Invalid Code!")
          }
      
        
    

    }catch(err) {
        res.status(404).send("Invitation doesnt exists!")
        console.log(err)
    }
    
    }
       
       
       
     
    

  

  
   

  
  export default verifyAccountSentActiveAndAccesCodeMiddleware;