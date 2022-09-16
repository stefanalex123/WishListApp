import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


//Verify_If_Invitation_To_User_Body_Is_Not_Sent
const invitationUserBodyNotSentMiddleware = async ( req, res, next) => {


try{
const groupInvitation = await prisma.groupInvitations.findMany({
    where: {
        groupId:req.params.id,
        userInvitedId:req.body.userInvitedId
    },
})


if(groupInvitation[0].userInvitedId==req.body.userInvitedId && groupInvitation[0].groupId==req.params.id && groupInvitation[0].status=="PENDING"){
    res.status(409).send("You already sent an invitation to this user!")
}

else if(groupInvitation[0].userInvitedId==req.body.userInvitedId && groupInvitation[0].groupId==req.params.id && groupInvitation[0].status=="ACCEPTED")
    res.status(409).send("This user is already a member of this group!")
else {
    next();
}

} catch(err) {
next();
}
    
}
       
       
       
     
    

  

  
   

  
  export default invitationUserBodyNotSentMiddleware;