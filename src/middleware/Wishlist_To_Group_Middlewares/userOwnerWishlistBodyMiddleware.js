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
    res.send("Incerci sa accesezi Wishlistul altui utilizator")
}

} catch(err) {
res.send("Acest WishList nu exista in baza de date")
}
    
}
       
       
       
     
    

  

  
   

  
  export default userOwnerWishlistBodyMiddleware;