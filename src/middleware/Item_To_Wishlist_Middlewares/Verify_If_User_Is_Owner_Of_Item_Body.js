import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const Verify_If_User_Is_Owner_Of_Item_Body = async ( req, res, next) => {
    try{
    const item = await prisma.items.findUnique({
        where: {
           id:req.body.itemid
        },
    
    })


    
    if(item.userid==req.auth.userid){
    //Userul este ownerul acestui item
       next();
    }
    else {
        res.send("Incerci sa accesezi item-ul altui utilizator")
    }
       
    }  catch(err) {
    
       res.send("Acest item nu exista in baza de date")
    }
        
    }

    export default Verify_If_User_Is_Owner_Of_Item_Body
          