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
        res.status(403).send("You are not the owner of this item")
    }
       
    }  catch(err) {
    
       res.status(404).send("This item doesn't exists ")
    }
        
    }

    export default itemExistsMiddleware
          