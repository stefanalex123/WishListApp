import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const Verify_If_Item_Body_Exists_In_ItemsDB = async ( req, res, next) => {
    try{
    const item = await prisma.items.findUnique({
        where: {
           id:req.body.itemid
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

    export default Verify_If_Item_Body_Exists_In_ItemsDB
          