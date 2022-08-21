import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


const Verify_If_User_Is_Member_Of_Group = async ( req, res, next) => {


try{
const groupinvitation = await prisma.groupInvitations.findMany({
    where: {
        groupid:req.params.id,
        userinvitedId:req.auth.userid
    },
})

if(groupinvitation[0].status=="ACCEPTED" && groupinvitation[0].groupid==req.params.id &&
groupinvitation[0].userinvitedId==req.auth.userid){
    next();
}

else {
    res.send("Nu sunteti membru al acestui grup")
}



} catch(err) {
    res.send("Nu sunteti membru al acestui grup")
}
    
}
       
       
       
     
    

  

  
   

  
  export default Verify_If_User_Is_Member_Of_Group;