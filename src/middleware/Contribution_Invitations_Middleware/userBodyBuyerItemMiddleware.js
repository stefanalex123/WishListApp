import { PrismaClient } from "@prisma/client";



const prisma = new PrismaClient();


//Verify_If_UserBody_is_buyer_of_item
const userBodyBuyerItemMiddleware = async ( req, res, next) => {


try{
    const buyItem = await prisma.buyItem.findMany({
        where: {
            itemId:req.params.itemId
        },
    })


if(buyItem[0].userBuyerId==req.body.userId && req.body.userId!=req.auth.userId){

   next()
}
else if(buyItem[0].userBuyerId==req.body.userId && req.body.userId==req.auth.userId){
    res.status(409).send("You Can't Contribute To An Item Bought Buy You")
}

else if(buyItem[0].userBuyerId!=req.body.userId){
    res.status(404).send("The User you introduces is not the first buyer of the item")
}

} catch(err) {
    res.status(404).send("The user you introduced is not the first buyer of this item!")
}
    
}
       
       
       
     
    

  

  
  export default userBodyBuyerItemMiddleware;