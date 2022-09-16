import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const emailTakenMiddleware = async ( req, res, next) => {
    try{
    const userprofile = await prisma.userProfile.findUnique({
        where: {
            email:req.body.email
        },
    
    
    })
    
    if(userprofile.email==req.body.email){
        res.status(409).send("This email is used by other users!")
    }
    else {
        next();
    }


} catch(err) {
    
      console.log(err);
      next();
    }
        
    }

    export default emailTakenMiddleware;