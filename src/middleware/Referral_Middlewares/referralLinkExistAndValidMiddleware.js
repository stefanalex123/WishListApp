import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


//Verify_If_Referral_Link_Exists_And_Valid
const referralLinkExistAndValidMiddleware = async ( req, res, next) => {


try{
const referralInvitation= await prisma.mailsReferralsInvitations.findMany({
    where: {
       groupId:req.params.groupId,
       userDeliverId:req.params.userDeliverId,
       emailSend:req.params.email
    },
})


if(referralInvitation[0].groupId==req.params.groupId && referralInvitation[0].userDeliverId==req.params.userDeliverId && referralInvitation[0].emailSend==req.params.email
    && referralInvitation[0].status=="AVAILABLE"){
    next();
}

else {
    res.send("Acest refferal link nu este valavil")
}

} catch(err) {
    res.send("Acest refferal link nu este valabil")
}
    
}
       
       
       
     
    

  

  
   

  
  export default referralLinkExistAndValidMiddleware;