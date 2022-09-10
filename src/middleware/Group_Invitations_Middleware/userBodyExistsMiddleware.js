import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


//Verify_If_User_Body_Exists 
const userBodyExistsMiddleware = async ( req, res, next) => {


try{
const userProfile = await prisma.userProfile.findUnique({
    where: {
        userId:req.body.userInvitedId
    
    },
})


if(userProfile.userId==req.body.userInvitedId){
   //Userul caruia ii trimitem invitatie exista
   next()
}
else{
    res.send("The user invited doesn't have a complete profile")
}

} catch(err) {
    res.send("The user invited doesn't have a complete profile")
}
    
}
       
       
       
     
    

  

  
  export default userBodyExistsMiddleware;