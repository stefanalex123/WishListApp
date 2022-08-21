import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


const Verify_If_Invitation_To_User_Body_Is_Not_Sent = async ( req, res, next) => {


try{
const groupinvitation = await prisma.groupInvitations.findMany({
    where: {
        groupid:req.params.id,
        userinvitedId:req.body.userinvitedId
    },
})


if(groupinvitation[0].userinvitedId==req.body.userinvitedId && groupinvitation[0].groupid==req.params.id){
    res.send("Acestui utilizator are deja o invitatie trimisa")
}

else {
    next();
}

} catch(err) {
next();
}
    
}
       
       
       
     
    

  

  
   

  
  export default Verify_If_Invitation_To_User_Body_Is_Not_Sent;