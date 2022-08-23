import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


const Verify_If_InvitationContr_To_User_Auth_Is_Sent= async ( req, res, next) => {


try{
    const contributioninvitation= await prisma.contributionInvitation.findUnique({
        where: {
            id:req.params.invitationid
        },
    })


if(contributioninvitation.useraskedid==req.auth.userid){

   next()
}
else{
    res.send("Nu ai primit aceasta inivtatie de a contribui")
}

} catch(err) {
    res.send("Nu ai primit aceasta invitatie de a contribui")
}
    
}
       
       
       
     
    

  

  
  export default Verify_If_InvitationContr_To_User_Auth_Is_Sent;