import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


//Verify_if_Item_Exists_In_ItemsDB
const itemExistsMiddleware = async ( req, res, next) => {
    try{
    const item = await prisma.items.findUnique({
        where: {
           id:req.params.id
        },
    
    })
    
    if(item.userId==req.auth.userId){
       next();
    }
    else {
        res.send("Incerci sa accesezi item-ul altui utilizator")
    }
       
    }  catch(err) {
    
       res.send("Acest item nu exista in baza de date")
    }
        
    }

    export default itemExistsMiddleware
          