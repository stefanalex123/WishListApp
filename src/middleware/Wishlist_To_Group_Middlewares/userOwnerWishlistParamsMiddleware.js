import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


//Verify_if_User_Is_Owner_Of_WishList_Param
const userOwnerWishlistParamsMiddleware = async ( req, res, next) => {


try{
const wishlist = await prisma.wishlist.findUnique({
    where: {
        id:req.params.wishlistId
    },
})

if(wishlist.userId==req.auth.userId){
// Userul detine acest wishlit
    next()
}
else {
    res.status(404).send("This wishlist is not available!")
}

} catch(err) {
res.status(404).send("This wishlist doesn't exists!")
}
    
}
       
       
       
     
    

  

  
   

  
  export default userOwnerWishlistParamsMiddleware;