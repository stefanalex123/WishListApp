import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


const Verify_If_Item_Params_Is_Shared_In_WishList = async ( req, res, next) => {


try{
const itemtowishlist = await prisma.itemtowishlist.findMany({
    where: {
        wishlistid:req.params.wishlistid,
        itemid:req.params.itemid
    },
})

if(itemtowishlist[0].itemid==req.params.itemid && itemtowishlist[0].wishlistid==req.params.wishlistid){
   //Acest item exista in wishlist ca sa il modificam/stergem
   next()
}
else{
    res.send("Trebuie sa adaugati itemul in wishlist mai intai")
}

} catch(err) {
    res.send("Trebuie sa adaugati itemul in wishlist mai intai")
}
    
}
       
       
       
     
    

  

  
   

  
  export default Verify_If_Item_Params_Is_Shared_In_WishList;