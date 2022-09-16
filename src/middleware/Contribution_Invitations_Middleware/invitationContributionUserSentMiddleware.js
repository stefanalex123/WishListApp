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


if(contributIoninvitation.userAskedId==req.auth.userId){

   next()
}
else{
    res.status(403).send("You didnt recieve this invitation to contribute!")
}

} catch(err) {
    res.status(403).send("You didnt recieve this invitation to contribute!")
}
    
}
       
       
       
     
    

  

  
  export default invitationContributionUserSentMiddleware;