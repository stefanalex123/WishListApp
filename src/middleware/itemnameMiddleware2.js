import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const itemnameMiddleware2 = async ( req, res, next) => {
    try{
    const item = await prisma.items.findUnique({
        where: {
           id:req.params.id
        },
    
    })
    
    if(item.userid==req.auth.userid){
       next();
    }
    else {
        res.send("Incerci sa accesezi item-ul altui utilizator")
    }
       
    }  catch(err) {
    
       res.send("Acest item nu exista in baza de date")
    }
        
    }

    export default itemnameMiddleware2
          