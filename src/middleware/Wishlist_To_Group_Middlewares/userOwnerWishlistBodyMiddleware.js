import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


//Verify_if_User_Is_Owner_Of_WishList_Body
const userOwnerWishlistBodyMiddleware = async ( req, res, next) => {


try{
const wishlist = await prisma.wishlist.findUnique({
    where: {
        id:req.body.wishlistId
    },
})

if(wishlist.userId==req.auth.userId){
// Userul detine acest wishlit
    next()
}
else {
    res.status(403).send("You cant acces this wishlist!")
}

} catch(err) {
res.status(409).send("This wishlist doesnt exists!")
}
    
}
       
       
       
     
    

  

  
   

  
  export default userOwnerWishlistBodyMiddleware;