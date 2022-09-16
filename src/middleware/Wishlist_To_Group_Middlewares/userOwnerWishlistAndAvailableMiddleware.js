import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


//Verify_if_User_Is_Owner_Of_WishList_Body_And_Wishlist_Available
const userOwnerWishlistAndAvailableMiddleware = async ( req, res, next) => {


try{
const wishlist = await prisma.wishlist.findUnique({
    where: {
        id:req.body.wishlistId
    },
})

if(wishlist.userId==req.auth.userId && wishlist.status=="AVAILABLE"){
// Userul detine acest wishlit
    next()
}

else if(wishlist.userId==req.auth.userId && wishlist.status!="AVAILABLE"){
    res.status(403).send("This wishlist is empty, you can't share it")
    }
else {
    res.status(404).send("This wishlsit is not available")
}

} catch(err) {
res.status(404).send("This wishlist doesn't exists")
}
    
}
       
       
       
     
    

  

  
   

  
  export default userOwnerWishlistAndAvailableMiddleware;