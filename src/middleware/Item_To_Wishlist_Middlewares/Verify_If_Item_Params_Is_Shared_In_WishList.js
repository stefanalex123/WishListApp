import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


const Verify_If_Item_Params_Is_Shared_In_WishList = async ( req, res, next) => {


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
    res.send("Trebuie sa adaugati itemul in wishlist mai intai")
}

} catch(err) {
    res.send("Trebuie sa adaugati itemul in wishlist mai intai")
}
    
}
       
       
       
     
    

  

  
   

  
  export default Verify_If_Item_Params_Is_Shared_In_WishList;