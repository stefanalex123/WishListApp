import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


const Verify_If_Invitation_To_User_Params_Is_Sent = async ( req, res, next) => {


try{
const groupinvitation = await prisma.groupInvitations.findMany({
    where: {
        groupid:req.params.id,
        userinvitedid:req.params.userinvitedid
    },
})


if(groupinvitation[0].userinvitedid==req.params.userinvitedid && groupinvitation[0].groupid==req.params.id && groupinvitation[0].status=="PENDING"){
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