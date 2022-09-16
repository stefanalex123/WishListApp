import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();



//Verify_If_Item_is_having_Principal_Buyer
const itemPrincipalBuyerMiddleware= async ( req, res, next) => {
    try{
        const item = await prisma.items.findUnique({
            where: {
               id:req.params.itemId
            },
        
        })
        
        if(item.status=="INDISPONIBLE"){
           res.status(403).send("You can't contribute for this item becuase it doesnt have a principal buyer!")
        }
        else {
            next();
        }
           
        }  catch(err) {
        
           res.status(404).send("Acest item nu exista in baza de date")
        }
}
       
       
       
     
    

  

  
   

  
  export default itemPrincipalBuyerMiddleware;