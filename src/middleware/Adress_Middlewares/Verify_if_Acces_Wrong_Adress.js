import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const Verify_if_Acces_Wrong_Adress= async ( req, res, next) => {
    try{
    const adress = await prisma.adress.findUnique({
        where: {
           id:req.params.id
        },
    
    })
    
    if(adress.userId==req.auth.userId){
       next();
    }
    else {
        res.send("Incerci sa accesezi adresa altui utilizator")
    }
       
    }  catch(err) {
    
       res.send("Acesta adresa nu exista in baza de date")
    }
        
    }

    export default Verify_if_Acces_Wrong_Adress
          