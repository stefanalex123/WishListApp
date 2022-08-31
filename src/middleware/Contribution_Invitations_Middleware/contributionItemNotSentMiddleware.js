import { PrismaClient } from "@prisma/client";




const prisma = new PrismaClient();


//Verify_If_Contribution_Invitation_To_Item_Is_Not_Sent
const contributionItemNotSentMiddleware= async ( req, res, next) => {


try{
    const contributionInvitation= await prisma.contributionInvitation.findMany({
        where: {
            itemId:req.params.itemId,
            userContributerId:req.auth.userId
        },
    })


if(contributionInvitation[0].itemId==req.params.itemId && contributionInvitation[0].usercontributerId==req.auth.userId){
res.send("Aceasta invitatie exista deja")

}
else{
    next();
}

} catch(err) {
 next();
}
    
}
       
       
       
     
    

  

  
  export default contributionItemNotSentMiddleware;