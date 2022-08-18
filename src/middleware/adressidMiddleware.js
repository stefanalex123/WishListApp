import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const adressidMiddleware = async ( req, res, next) => {
    try{
    const adress = await prisma.adress.findUnique({
        where: {
           id:req.params.id
        },
    
    })
    
    if(adress.userid==req.auth.userid){
       next();
    }
    else {
        res.send("Incerci sa accesezi adresa altui utilizator")
    }
       
    }  catch(err) {
    
       res.send("Acesta adresa nu exista in baza de date")
    }
        
    }

    export default adressidMiddleware
          