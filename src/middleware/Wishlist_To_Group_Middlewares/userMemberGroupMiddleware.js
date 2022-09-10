import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


//Verify_If_User_Is_Member_Of_Group
const userMemberGroupMiddleware = async ( req, res, next) => {


try{
const groupInvitation = await prisma.groupInvitations.findMany({
    where: {
        groupId:req.params.id,
        userInvitedId:req.auth.userId
    },
})


if(groupInvitation[0].status=="ACCEPTED" && groupInvitation[0].groupId==req.params.id &&
groupInvitation[0].userInvitedId==req.auth.userId){
    next();
}

else {
    res.send("Nu sunteti membru al acestui grup")
}



} catch(err) {
   
    res.send("Nu sunteti membru al acestui gruppp")
}
    
}
       
       
       
     
    

  

  
   

  
  export default userMemberGroupMiddleware;