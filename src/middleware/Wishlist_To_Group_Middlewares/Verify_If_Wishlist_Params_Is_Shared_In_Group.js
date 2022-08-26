import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


const Verify_If_Wishlist_Params_Is_Shared_In_Group = async ( req, res, next) => {


try{
const wishlistToGroup = await prisma.wishlistToGroup.findMany({
    where: {
        groupId:req.params.Id,
        wishlistId:req.params.wishlistId,
    },
})


if(wishlistToGroup[0].wishlistId==req.params.wishlistId && wishlistToGroup[0].groupId==req.params.id){
  next();
}
else{
  res.send("Acest wishlist nu a fost partajat pe grup")
}

} catch(err) {
    res.send("Acest wishlist nu a fost partajat pe grup ")
}
    
}
       
       
       
     
    

  

  
   

  
  export default Verify_If_Wishlist_Params_Is_Shared_In_Group;