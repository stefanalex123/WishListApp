import { PrismaClient } from "@prisma/client";



const prisma = new PrismaClient();


const Verify_If_UserBody_is_buyer_of_item = async ( req, res, next) => {


try{
    const buyItem = await prisma.buyItem.findMany({
        where: {
            itemId:req.params.itemId
        },
    })


if(buyItem[0].userBuyerId==req.body.userAskedId){

   next()
}
else{
    res.send("Userul pe care l ai introdus nu este primul cumaparator al acestui item")
}

} catch(err) {
    res.send("Userul pe care l ai introdus nu este primul cumaparator al acestui item")
}
    
}
       
       
       
     
    

  

  
  export default Verify_If_UserBody_is_buyer_of_item;