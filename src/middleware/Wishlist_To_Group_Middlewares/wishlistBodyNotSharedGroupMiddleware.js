import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


//Verify_If_Wishlist_Body_Is_Not_Shared_In_Group
const wishlistBodyNotSharedGroupMiddleware = async ( req, res, next) => {


try{
const wishlistToGroup = await prisma.wishlistToGroup.findMany({
    where: {
        groupId:req.params.id,
        wishlistId:req.body.wishlistId,
    },
})


if(wishlistToGroup[0].wishlistId==req.body.wishlistId && wishlistToGroup[0].groupId==req.params.id){
   res.status(409).send("This wishlist is already shared in this group!")
}
else{
  next();
}

} catch(err) {
    next();
}
    
}
       
       
       
     
    

  

  
   

  
  export default wishlistBodyNotSharedGroupMiddleware;