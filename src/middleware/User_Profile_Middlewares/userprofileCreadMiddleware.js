import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const userprofileCreatedMiddleware = async ( req, res, next) => {
try{
const userprofile = await prisma.userProfile.findUnique({
    where: {
        userId:req.auth.userId
    },


})

if(userprofile.userId==req.auth.userId){

    res.send("You can't create more than one userprofile");
   
}
else{
    next();
}


} catch(err) {

   next();
}
    
}
       
  export default userprofileCreatedMiddleware;