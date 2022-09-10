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
        res.send("This email is used by other users!")
    }
    else {
        next();
    }


} catch(err) {
    
       next();
    }
        
    }

    export default emailTakenMiddleware;