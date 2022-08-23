import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


const Verify_If_Item_Body_Is_Not_Shared_In_WishList = async ( req, res, next) => {


try{
const itemtowishlist = await prisma.itemtowishlist.findMany({
    where: {
        wishlistid:req.params.id,
        itemid:req.body.itemid
    },
})


if(itemtowishlist[0].itemid==req.body.itemid && itemtowishlist[0].wishlistid==req.params.id){
   //Acest item exista in wishlist ca sa il modificam/stergem
res.send("Acest item a fost deja adaugat in wihslist")
}
else{
    next()
}

} catch(err) {
    next()
}
    
}
       
       
       
     
    

  

  
   

  
  export default Verify_If_Item_Body_Is_Not_Shared_In_WishList;