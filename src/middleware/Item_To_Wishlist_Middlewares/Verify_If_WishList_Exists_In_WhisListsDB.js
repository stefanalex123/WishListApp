import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();



    


const Verify_If_WishList_Exists_In_WhisListsDB = async ( req, res, next) => {


try{
const itemtowishlist = await prisma.itemtowishlist.findMany({
    where: {
        wishlistid:req.params.id
    },
})



    next()


} catch(err) {
res.send("Acest WishList nu eixsta in baza de date")
}
    
}
       
       
       
     
    

  

  
   

  
  export default Verify_If_WishList_Exists_In_WhisListsDB;