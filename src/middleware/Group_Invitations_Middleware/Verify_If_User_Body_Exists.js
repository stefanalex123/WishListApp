import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


const Verify_If_User_Body_Exists = async ( req, res, next) => {


try{
const users = await prisma.user.findUnique({
    where: {
        id:req.body.userinvitedID
    },
})


if(users.id==req.body.userinvitedID){
   //Userul caruia ii trimitem invitatie exista
   next()
}
else{
    res.send("Userul pe care incerci sa il inviti nu exista")
}

} catch(err) {
    res.send("Userul pe care incerci sa il inviti nu exista")
}
    
}
       
       
       
     
    

  

  
  export default Verify_If_User_Body_Exists;