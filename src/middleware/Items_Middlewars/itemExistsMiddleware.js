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
        res.send("You are not the owner of this item")
    }
       
    }  catch(err) {
    
       res.send("This item doesn't exists ")
    }
        
    }

    export default itemExistsMiddleware
          