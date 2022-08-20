import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();



    


const Verify_if_Item_Params_Exists_In_ItemToWhislistsDB = async ( req, res, next) => {


try{
const itemtowishlist = await prisma.itemtowishlist.findMany({
    where: {
        itemid:req.params.itemid,
        wishlistid:req.params.id
    },
})



   next();


} catch(err) {
res.send("Item-ul pe care vrei sa il modifici nu exista in wishlist")
}
    
}
       
       
       
     
    

  

  
   

  
  export default Verify_if_Item_Params_Exists_In_ItemToWhislistsDB;