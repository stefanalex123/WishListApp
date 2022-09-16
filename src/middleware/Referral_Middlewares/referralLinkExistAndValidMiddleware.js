import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


//Verify_If_Referral_Link_Exists_And_Valid
const referralLinkExistAndValidMiddleware = async ( req, res, next) => {


try{
const referralInvitation= await prisma.mailsReferralsInvitations.findUnique({
    where: {
       id:req.params.referralInvitationId
    },
})


if(referralInvitation.id===req.params.referralInvitationId && referralInvitation.status==="AVAILABLE"){
    
    next();
}

else {
    res.status(409).send("This referral Link expired")
}

} catch(err) {
    res.status(409).send("This referral Link expired")
}
    
}
       
       
       
     
    

  

  
   

  
  export default referralLinkExistAndValidMiddleware;