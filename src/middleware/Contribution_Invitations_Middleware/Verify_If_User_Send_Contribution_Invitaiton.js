import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


const Verify_If_User_Send_Contribution_Invitaiton= async ( req, res, next) => {


try{
    const contributioninvitation= await prisma.contributionInvitation.findMany({
        where: {
            usercontributerid:req.auth.userid,
            itemid:req.params.itemid,
            
        },
    })


if(contributioninvitation[0].usercontributerid==req.auth.userid && contributioninvitation[0].itemid==req.params.itemid){

   next()
}
else{
    res.send("Nu ai trimis aceasta invitiatie ")
}

} catch(err) {
    res.send("Nu ai trimis aceasta invitatie ")
}
    
}
       
       
       
     
    

  

  
  export default Verify_If_User_Send_Contribution_Invitaiton;