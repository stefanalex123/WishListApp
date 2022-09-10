import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();



const createGoogleToken = async (req, res, next) => {

    try {
    
        console.log(req.user.id)
      const existingUser =  await prisma.user.findUnique({
        

        where: {
          id:req.user.id
        }
      })
      const geneateAuthToken = (id, email) => {
        return jwt.sign(
            { userId: id,
              email:email
                 },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
    }
    
      if(existingUser){
        
       res.send(geneateAuthToken(req.user.id, req.user.emails[0].value))
      }
     else {
      next();
     }
    } catch (error) {
    next();
    }
    
    }


    export default createGoogleToken