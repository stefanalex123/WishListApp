import { PrismaClient } from "@prisma/client";



const prisma = new PrismaClient();


//Verify_If_InvitationContr_To_User_Auth_Is_Sent
const invitationContributionUserSentMiddleware= async ( req, res, next) => {


try{
    const contributIoninvitation= await prisma.contributionInvitation.findUnique({
        where: {
            id:req.params.invitationId
        },
    })


if(contributionInvitation.userAskedId==req.auth.userId){

   next()
}
else{
    res.send("Nu ai primit aceasta inivtatie de a contribui")
}

} catch(err) {
    res.send("Nu ai primit aceasta invitatie de a contribui")
}
    
}
       
       
       
     
    

  

  
  export default invitationContributionUserSentMiddleware;