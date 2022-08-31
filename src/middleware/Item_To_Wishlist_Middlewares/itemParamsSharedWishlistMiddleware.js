import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


//Verify_If_Item_Params_Is_Shared_In_WishList
const itemParamsSharedWishlistMiddleware = async ( req, res, next) => {


try{
const itemToWishlist = await prisma.itemToWishlist.findMany({
    where: {
        wishlistId:req.params.id,
        itemId:req.params.itemId
    },
})

if(itemToWishlist[0].itemId==req.params.itemId && itemToWishlist[0].wishlistId==req.params.id){
   //Acest item exista in wishlist ca sa il modificam/stergem
   next()
}
else{
    res.send("Trebuie sa adaugati itemul in wishlist mai intai")
}

} catch(err) {
    res.send("Trebuie sa adaugati itemul in wishlist mai intai")
}
    
}
       
       
       
     
    

  

  
   

  
  export default itemParamsSharedWishlistMiddleware;