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

if(group.groupownerid==req.auth.userid){
// Userul este ownerul acestui grup
    next()
}
else {
    res.send("Nu esti ownerul al acestui grup")
}

} catch(err) {
res.send("Acest grup nu exista in baza de date")
}
    
}
       
       
       
     
    

  

  
   

  
  export default userOwnerGroup;