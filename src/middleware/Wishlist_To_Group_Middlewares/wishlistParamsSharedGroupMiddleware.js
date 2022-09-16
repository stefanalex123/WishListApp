import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


//Verify_If_Wishlist_Params_Is_Shared_In_Group 
const wishlistParamsSharedGroupMiddleware = async ( req, res, next) => {


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
  res.status(404).send("The wishlist you try to delete/modify is not shared in the group")
}

} catch(err) {
    res.status(404).send("The wishlist you try to delete/modify is not shared in the group")
}
    
}
       
       
       
     
    

  

  
   

  
  export default wishlistParamsSharedGroupMiddleware;