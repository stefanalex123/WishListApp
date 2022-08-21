import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


const Verify_If_Wishlist_Body_Is_Not_Shared_In_Group = async ( req, res, next) => {


try{
const wishlisttogroup = await prisma.wishlisttogroup.findMany({
    where: {
        groupid:req.params.id,
        wishlistid:req.body.wishlistid,
    },
})


if(wishlisttogroup[0].wishlistid==req.body.wishlistid && wishlisttogroup[0].groupid==req.params.id){
   res.send("Acest wishlist este deja partajat pe acest grup")
}
else{
  next();
}

} catch(err) {
    next();
}
    
}
       
       
       
     
    

  

  
   

  
  export default Verify_If_Wishlist_Body_Is_Not_Shared_In_Group;