import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


const Verify_If_User_Body_Exists = async ( req, res, next) => {


try{
const userprofile = await prisma.userProfile.findUnique({
    where: {
        userid:req.body.userinvitedid
    
    },
})


if(userprofile.userid==req.body.userinvitedid){
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