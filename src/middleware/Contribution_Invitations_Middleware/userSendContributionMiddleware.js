import { PrismaClient } from "@prisma/client";



const prisma = new PrismaClient();


//Verify_If_User_Send_Contribution_Invitaiton=
const userSendContributionMiddleware= async ( req, res, next) => {


try{
    const contributionInvitation= await prisma.contributionInvitation.findMany({
        where: {
            userContributerId:req.auth.userId,
            itemId:req.params.itemId,
            
        },
    })


if(contributionInvitation[0].userContributerId==req.auth.userId && contributionInvitation[0].itemId==req.params.itemId){

   next()
}
else{
    res.send("Nu ai trimis aceasta invitiatie ")
}

} catch(err) {
    res.send("Nu ai trimis aceasta invitatie ")
}
    
}
       
       
       
     
    

  

  
  export default userSendContributionMiddleware;