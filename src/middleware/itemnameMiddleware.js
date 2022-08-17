import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

    async function  NumeSugestie(numeNou){

    try{
        const item =  await prisma.items.findUnique({
            where: {
                ItemName:numeNou
            },
    
        })

        if(item.ItemName==numeNou){
        var NumeNouRandom= await randomIntFromInterval(10,90)
        return NumeSugestie(numeNou + NumeNouRandom);
        }
    } catch(err){
        return numeNou;
    }
    }


const itemnameMiddleware = async ( req, res, next) => {
try{
const item = await prisma.items.findUnique({
    where: {
        ItemName:req.body.ItemName
    },

})

if(item.ItemName==req.body.ItemName){
    var msg= await NumeSugestie(req.body.ItemName);
    res.send("Acest Item Name este preluat de alt Item, poti prelua acest Item: "+ msg);

   
} } catch(err) {

   next();
}
    
}
       
       
       
     
    

  

  
   

  
  export default itemnameMiddleware;