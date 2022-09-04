import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


//Verify_If_Forgot_Password_Link_Not_Send
const requestForgotPasswordNotSentMiddleware = async ( req, res, next) => {


try{
const forgotPassword= await prisma.for.findMany({
    where: {
       groupId:req.params.id,
       emailSend:req.body.email
    },
})


if(referralInvitation[0].groupId==req.params.id && referralInvitation[0].emailSend==req.body.email && referralInvitation[0].status=="AVAILABLE"){
    res.send("Aceeasta invitatie catre aceasta adresa a fost trimisa deja")
}

else {
    next();
}

} catch(err) {
    next();
}
    
}
       
       
       
     
    

  

  
   

  
  export default requestForgotPasswordNotSentMiddleware;