import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


//Verify_If_Item_Params_Is_Shared_In_WishList
const itemParamsSharedWishlistMiddleware = async ( req, res, next) => {


try{
const itemToWishlist = await prisma.itemToWishlist.findMany({
    where: {
        wishlistId:req.params.wishlistId,
        itemId:req.params.itemId
    },
})

if(itemToWishlist[0].itemId==req.params.itemId && itemToWishlist[0].wishlistId==req.params.wishlistId){
   //Acest item exista in wishlist ca sa il modificam/stergem
   next()
}
else{
    res.status(403).send("You need to add the item in the wishlist first")
}

} catch(err) {
    res.status(403).send("You need to add the item in the wishlist first")
}
    
}
       
       
       
     
    

  

  
   

  
  export default itemParamsSharedWishlistMiddleware;