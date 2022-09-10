import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();




//Verify_if_Acces_Wrong_Adress
const accesWrongAdressMiddleware= async ( req, res, next) => {
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
        res.send("You are not owner of this adress")

    }
       
    }  catch(err) {
    
       res.send("This adress doesn't exists ")
    }
        
    }

    export default accesWrongAdressMiddleware
          