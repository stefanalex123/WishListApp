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
           res.send("Nu a cumparat nimeni acest item ca sa poti contirbui")
        }
        else {
            next();
        }
           
        }  catch(err) {
        
           res.send("Acest item nu exista in baza de date")
        }
}
       
       
       
     
    

  

  
   

  
  export default itemPrincipalBuyerMiddleware;