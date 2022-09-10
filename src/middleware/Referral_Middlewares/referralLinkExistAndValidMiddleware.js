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
    console.log("test")
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