import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


const Verify_If_Invitation_To_User_Body_Is_Not_Sent = async ( req, res, next) => {


try{
const groupInvitation = await prisma.groupInvitations.findMany({
    where: {
        groupId:req.params.id,
        userInvitedId:req.body.userInvitedId
    },
})


if(groupinvitation[0].userInvitedId==req.body.userInvitedId && groupInvitation[0].groupId==req.params.id && groupInvitation[0].status=="PENDING"){
    res.send("Acest utilizator are deja o invitatie trimisa")
}

else if(groupInvitation[0].userInvitedId==req.body.userInvitedId && groupInvitation[0].groupId==req.params.id && groupInvitation[0].status=="ACCEPTED")
    res.send("Acest utilizator face parte din grup")
else {
    next();
}

} catch(err) {
next();
}
    
}
       
       
       
     
    

  

  
   

  
  export default Verify_If_Invitation_To_User_Body_Is_Not_Sent;