import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


const Verify_If_UserBody_is_buyer_of_item = async ( req, res, next) => {


try{
    const buyitem = await prisma.buyItem.findMany({
        where: {
            itemid:req.params.itemid
        },
    })


if(buyitem[0].userbuyerid==req.body.useraskedid){

   next()
}
else{
    res.send("Userul pe care l ai introdus nu este primul cumaparator al acestui itemmmm")
}

} catch(err) {
    res.send("Userul pe care l ai introdus nu este primul cumaparator al acestui itemmmm")
}
    
}
       
       
       
     
    

  

  
  export default Verify_If_UserBody_is_buyer_of_item;