import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


//Verify_If_Invitation_To_User_Params_Is_Sent
const invitationUserParamsSentMiddleware = async ( req, res, next) => {


try{
const groupInvitation = await prisma.groupInvitations.findMany({
    where: {
        groupId:req.params.id,
        userInvitedId:req.params.userInvitedId,
    },
})


if(groupInvitation[0].userInvitedId==req.params.userInvitedId && groupInvitation[0].groupId==req.params.id && groupInvitation[0].status=="PENDING"){
    next();
}

else {
    res.send("This invitation doesn't exists!")
}

} catch(err) {
    res.send("This invitation doesn't exists!")
}
    
}
       
       
       
     
    

  

  
   

  
  export default invitationUserParamsSentMiddleware;