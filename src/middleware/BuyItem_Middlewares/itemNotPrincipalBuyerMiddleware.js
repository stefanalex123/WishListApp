import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


//Verify_If_Item_is_not_having_Principal_Buyer
const itemNotPrincipalBuyerMiddleware = async ( req, res, next) => {
    
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
           res.status(409).send("This item already has a principal buyer, you can contribute for it")
        }
           
        }  catch(err) {
        
           res.status(404).send("This item doesn't exists")
        }
            
        }



       
       
       
     
    

  

  
   

  
  export default itemNotPrincipalBuyerMiddleware;