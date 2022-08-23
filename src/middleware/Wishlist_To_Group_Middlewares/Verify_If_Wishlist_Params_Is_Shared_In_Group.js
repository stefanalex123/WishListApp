import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


const Verify_If_Wishlist_Params_Is_Shared_In_Group = async ( req, res, next) => {


try{
const wishlisttogroup = await prisma.wishlisttogroup.findMany({
    where: {
        groupid:req.params.id,
        wishlistid:req.params.wishlistid,
    },
})


if(wishlisttogroup[0].wishlistid==req.params.wishlistid && wishlisttogroup[0].groupid==req.params.id){
  next();
}
else{
  res.send("Acest wishlist nu a fost partajat pe grup pentru a il putea modifica/sterge sau nu il detineti")
}

} catch(err) {
    res.send("Acest wishlist nu a fost partajat pe grup pentru a il putea modifica/sterge")
}
    
}
       
       
       
     
    

  

  
   

  
  export default Verify_If_Wishlist_Params_Is_Shared_In_Group;