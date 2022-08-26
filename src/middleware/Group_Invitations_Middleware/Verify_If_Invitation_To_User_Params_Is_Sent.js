import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


const Verify_If_Invitation_To_User_Params_Is_Sent = async ( req, res, next) => {


try{
const groupInvitation = await prisma.groupInvitations.findMany({
    where: {
        groupId:req.params.id,
        userInvitedId:req.params.userInvitedId
    },
})


if(groupInvitation[0].userInvitedId==req.params.userInvitedId && groupInvitation[0].groupId==req.params.id && groupInvitation[0].status=="PENDING"){
    next();
}

else {
    res.send("Aceeasta invitatie nu exista pentru a o putea sterge/modifica")
}

} catch(err) {
    res.send("Aceeasta invitatie nu exista pentru a o putea sterge/modifica")
}
    
}
       
       
       
     
    

  

  
   

  
  export default Verify_If_Invitation_To_User_Params_Is_Sent;