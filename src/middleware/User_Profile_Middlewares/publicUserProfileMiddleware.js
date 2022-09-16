import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const publicUserProfileMiddleware = async ( req, res, next) => {
try{
const userprofile = await prisma.userProfile.findUnique({
    where: {
        userId:req.auth.userId
    },


})

if(userprofile.status=='PUBLIC'){

    next();
   
}
else{
    res.status(403).send("This profile is private")
}


} catch(err) {

   res.status(403).send("This profile is private")
}
    
}
       
  export default publicUserProfileMiddleware;

  