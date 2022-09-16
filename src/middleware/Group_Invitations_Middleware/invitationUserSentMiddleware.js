import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


//Verify_If_Invitation_To_User_Auth_Is_Sent
const contributionUserSentMiddleware = async ( req, res, next) => {


try{
const groupInvitation = await prisma.groupInvitations.findUnique({
    where: {
        id:req.params.invitationId,
    },
})


if(groupInvitation.status=="PENDING" &&  groupInvitation.userInvitedId==req.auth.userId){
    next();
}

else {
    res.status(404).send("You cant refuse or accept this invitation because it doesnt exists!")
}

} catch(err) {
    res.status(404).send("You cant refuse or accept this invitation because it doesnt exists!")
}
    
}
       
       
       
     
    

  

  
   

  
  export default contributionUserSentMiddleware;