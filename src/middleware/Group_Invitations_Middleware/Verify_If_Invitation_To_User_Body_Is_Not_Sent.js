import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


const Verify_If_Invitation_To_User_Body_Is_Not_Sent = async ( req, res, next) => {


try{
const groupinvitation = await prisma.groupInvitations.findMany({
    where: {
        groupid:req.params.id,
        userinvitedid:req.body.userinvitedid
    },
})


if(groupinvitation[0].userinvitedid==req.body.userinvitedid && groupinvitation[0].groupid==req.params.id && groupinvitation[0].status=="PENDING"){
    res.send("Acest utilizator are deja o invitatie trimisa")
}

else if(groupinvitation[0].userinvitedid==req.body.userinvitedid && groupinvitation[0].groupid==req.params.id && groupinvitation[0].status=="ACCEPTED")
    res.send("Acest utilizator face parte din grup")
else {
    next();
}

} catch(err) {
next();
}
    
}
       
       
       
     
    

  

  
   

  
  export default Verify_If_Invitation_To_User_Body_Is_Not_Sent;