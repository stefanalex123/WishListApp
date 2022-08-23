import { PrismaClient } from "@prisma/client";



const prisma = new PrismaClient();


const Verify_If_Contribution_Invitation_To_Item_Is_Sent= async ( req, res, next) => {


try{
    const contributioninvitation= await prisma.contributionInvitation.findMany({
        where: {
            itemid:req.params.itemid,
            usercontributerid:req.auth.userid
        },
    })


if(contributioninvitation[0].itemid==req.params.itemid && contributioninvitation[0].usercontributerid==req.auth.userid){
next();

}
else{
   res.send("Invitation doesnt exist to delete it")
}

} catch(err) {
    res.send("Invitation doesnt exist to delete it")
}
    
}
       
       
       
     
    

  

  
  export default Verify_If_Contribution_Invitation_To_Item_Is_Sent;