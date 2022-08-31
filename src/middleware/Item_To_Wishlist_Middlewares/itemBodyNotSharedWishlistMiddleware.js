import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();




//Verify_If_Item_Body_Is_Not_Shared_In_WishList
const itemBodyNotSharedWishlistMiddleware = async ( req, res, next) => {


try{
const itemToWishlist = await prisma.itemToWishlist.findMany({
    where: {
        wishlistId:req.params.id,
        itemId:req.body.itemId
    },
})


if(itemToWishlist[0].itemId==req.body.itemId && itemToWishlist[0].wishlistId==req.params.id){
   //Acest item exista in wishlist ca sa il modificam/stergem
res.send("Acest item a fost deja adaugat in wihslist")
}
else{
    next()
}

} catch(err) {
    next()
}
    
}
       
       
       
     
    

  

  
   

  
  export default itemBodyNotSharedWishlistMiddleware;