import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


const Verify_If_Item_is_not_having_Principal_Buyer = async ( req, res, next) => {
    
    try{
        const item = await prisma.items.findUnique({
            where: {
               id:req.params.itemId
            },
        
        })
        
        if(item.status=="DISPONIBLE"){
           next();
        }
        else {
           res.send("Acest item are un cumparator principal, poti contrbui la el")
        }
           
        }  catch(err) {
        
           res.send("Acest item nu exista in baza de date")
        }
            
        }



       
       
       
     
    

  

  
   

  
  export default Verify_If_Item_is_not_having_Principal_Buyer;