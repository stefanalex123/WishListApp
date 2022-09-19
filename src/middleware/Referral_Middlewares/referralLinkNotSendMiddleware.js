import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


//Verify_If_Referral_Link_Exists_And_Valid
const referralLinkNotSendMiddleware = async ( req, res, next) => {


try{
const referralInvitation= await prisma.mailsReferralsInvitations.findMany({
    where: {
       groupId:req.params.id,
       emailSend:req.body.email,
       status:'AVAILABLE'
    },
})

console.log(referralInvitation)
if(referralInvitation[0].groupId==req.params.id && referralInvitation[0].emailSend==req.body.email && referralInvitation[0].status=="AVAILABLE"){
    res.status(409).send("You already sent this invitation!")
}

else {
    next();
}

} catch(err) {
    next();
}
    
}
       
       
       
     
    

  

  
   

  
  export default referralLinkNotSendMiddleware;