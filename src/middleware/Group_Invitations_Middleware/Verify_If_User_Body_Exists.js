import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


const Verify_If_User_Body_Exists = async ( req, res, next) => {


try{
const userProfile = await prisma.userProfile.findUnique({
    where: {
        userId:req.body.userInvitedId
    
    },
})


if(userProfile.userId==req.body.userInvitedId){
   //Userul caruia ii trimitem invitatie exista
   next()
}
else{
    res.send("Userul pe care incerci sa il inviti nu exista sau nu si a completat profilul")
}

} catch(err) {
    res.send("Userul pe care incerci sa il inviti nu exista sau nu si a completat profilul")
}
    
}
       
       
       
     
    

  

  
  export default Verify_If_User_Body_Exists;