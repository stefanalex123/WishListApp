import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

//Verify_If_User_is_Owner_Of_Group

const userOwnerGroup = async ( req, res, next) => {


try{
const group = await prisma.group.findUnique({
    where: {
        id:req.params.id
    },
})

if(group.groupOwnerId==req.auth.userId){
// Userul este ownerul acestui grup
    next()
}
else {
    res.status(403).send("You are not the owner of the group!")
}

} catch(err) {
res.status(404).send("This group doesnt exists!")
}
    
}
       
       
       
     
    

  

  
   

  
  export default userOwnerGroup;