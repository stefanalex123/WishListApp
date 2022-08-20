import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();



    


const Verify_if_Item_Body_Exists_In_ItemToWhislistsDB = async ( req, res, next) => {


try{
const itemtowishlist = await prisma.itemtowishlist.findMany({
    where: {
        itemid:req.body.itemid,
        wishlistid:req.params.id
    },
})


if(itemtowishlist[0].itemid==req.body.itemid){
    res.send("Acest item exista deja in wishlist")
}

} catch(err) {
next();
}
    
}
       
       
       
     
    

  

  
   

  
  export default Verify_if_Item_Body_Exists_In_ItemToWhislistsDB;