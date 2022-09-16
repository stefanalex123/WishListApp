import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const accesWrongUserProfileMiddleware = async ( req, res, next) => {
try{
const userprofile = await prisma.userProfile.findUnique({
    where: {
        userId:req.auth.userId
    },


})

if(userprofile.userId==req.auth.userId){

    next();
   
}
else{
    res.status(403).send("You can't acces this userprofile")
}


} catch(err) {

   res.status(404).send("This userprofoile doesn't exists")
}
    
}
       
  export default accesWrongUserProfileMiddleware;

  