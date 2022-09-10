import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


//Verify_If_User_Is_Owner_Of_Item_Body
const userOwnerItemBodyMiddleware = async ( req, res, next) => {
    try{
    const item = await prisma.items.findUnique({
        where: {
           id:req.body.itemId
        },
    
    })


    
    if(item.userId==req.auth.userId){
    //Userul este ownerul acestui item
       next();
    }
    else {
        res.send("This item is not available")
    }
       
    }  catch(err) {
    
       res.send("This item doesn't exists")
    }
        
    }

    export default userOwnerItemBodyMiddleware
          