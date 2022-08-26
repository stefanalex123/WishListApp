import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


const Verify_If_Invitation_To_User_Auth_Is_Sent = async ( req, res, next) => {


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
    res.send("Aceeasta invitatie nu exista pentru a o putea refuza/accepta")
}

} catch(err) {
    res.send("Aceeasta invitatie nu exista pentru a o putea refuza/accepta")
}
    
}
       
       
       
     
    

  

  
   

  
  export default Verify_If_Invitation_To_User_Auth_Is_Sent;