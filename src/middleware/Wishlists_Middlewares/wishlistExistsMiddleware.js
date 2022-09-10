import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


//Verify_If_Wishlist_Exists_in_WishlistsDB
const wishlistExistsMiddleware = async ( req, res, next) => {
    try{
    const wishlist = await prisma.wishlist.findUnique({
        where: {
           id:req.params.id
        },
    
    })
    
    if(wishlist.userId==req.auth.userId){
       next();
    }
    else {
        res.send("You don't have acces to this wishlist")
    }
       
    }  catch(err) {
    
       res.send("This wishlist doesn't exists")
    }
        
    }

    export default wishlistExistsMiddleware
          