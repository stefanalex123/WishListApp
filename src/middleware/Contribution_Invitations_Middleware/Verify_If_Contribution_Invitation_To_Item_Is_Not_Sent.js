import { PrismaClient } from "@prisma/client";



const prisma = new PrismaClient();


const Verify_If_Contribution_Invitation_To_Item_Is_Not_Sent= async ( req, res, next) => {


try{
    const contributioninvitation= await prisma.contributionInvitation.findMany({
        where: {
            itemid:req.params.itemid,
            usercontributerid:req.auth.userid
        },
    })


if(contributioninvitation[0].itemid==req.params.itemid && contributioninvitation[0].usercontributerid==req.auth.userid){
res.send("Aceasta invitatie exista deja")

}
else{
    next();
}

} catch(err) {
 next();
}
    
}
       
       
       
     
    

  

  
  export default Verify_If_Contribution_Invitation_To_Item_Is_Not_Sent;