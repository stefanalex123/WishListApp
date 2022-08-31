import { PrismaClient } from "@prisma/client";




const prisma = new PrismaClient();


//Verify_If_Contribution_Invitation_To_Item_Is_Sent
const contributionItemSentMiddleware= async ( req, res, next) => {


try{
    const contributionInvitation= await prisma.contributionInvitation.findMany({
        where: {
            itemId:req.params.itemId,
            userContributerId:req.auth.userId
        },
    })


if(contributionInvitation[0].itemId==req.params.itemId && contributionInvitation[0].usercontributerId==req.auth.userId){
next();

}
else{
   res.send("Invittatia nu exista")
}

} catch(err) {
    res.send("Invitatia nu exista")
}
    
}
       
       
       
     
    

  

  
  export default contributionItemSentMiddleware;