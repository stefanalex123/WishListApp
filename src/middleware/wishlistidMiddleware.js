import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const wishlistidMiddleware = async ( req, res, next) => {
    try{
    const wishlist = await prisma.wishlist.findUnique({
        where: {
           id:req.params.id
        },
    
    })
    
    if(wishlist.userid==req.auth.userid){
       next();
    }
    else {
        res.send("Incerci sa accesezi Wishlistul altui utilizator")
    }
       
    }  catch(err) {
    
       res.send("Acest wishlist nu exista in baza de date")
    }
        
    }

    export default wishlistidMiddleware
          