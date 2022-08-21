import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


const Verify_If_Item_Params_Is_Shared_In_WishList = async ( req, res, next) => {


try{
const itemtowishlist = await prisma.itemtowishlist.findMany({
    where: {
        wishlistid:req.params.id,
        itemid:req.params.itemid
    },
})


if(itemtowishlist[0].itemid==req.body.itemid && itemtowishlist[0].wishlistid==req.params.id){
   //Acest item exista in wishlist ca sa il modificam/stergem
   next()
}
else{
    res.send("Trebuie sa adaugati itemul in wishlist pentru a il putea modifica/sterge")
}

} catch(err) {
    res.send("Trebuie sa adaugati itemul in wishlist pentru a il putea modifica/sterge")
}
    
}
       
       
       
     
    

  

  
   

  
  export default Verify_If_Item_Params_Is_Shared_In_WishList;