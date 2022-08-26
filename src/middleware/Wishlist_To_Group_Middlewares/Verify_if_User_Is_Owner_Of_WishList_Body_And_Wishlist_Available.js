import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


const Verify_if_User_Is_Owner_Of_WishList_Body_And_Wishlist_Available = async ( req, res, next) => {


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
    res.send("Acest wihslit este gol, nu ii puteti face share")
    }
else {
    res.send("Incerci sa accesezi Wishlistul altui utilizator")
}

} catch(err) {
res.send("Acest WishList nu exista in baza de date")
}
    
}
       
       
       
     
    

  

  
   

  
  export default Verify_if_User_Is_Owner_Of_WishList_Body_And_Wishlist_Available;