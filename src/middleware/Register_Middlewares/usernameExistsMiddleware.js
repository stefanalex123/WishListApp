import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

    async function  NumeSugestie(numeNou){

    try{
        const user =  await prisma.user.findUnique({
            where: {
                username:numeNou
            },
    
        })

        if(user.username==numeNou){
        var NumeNouRandom= await randomIntFromInterval(10,90)
        return NumeSugestie(numeNou + NumeNouRandom);
        }
    } catch(err){
        return numeNou;
    }
    }


//Verify_if_Username_exists_in_UsersDB
const usernameExistsMiddleware = async ( req, res, next) => {
try{
const user = await prisma.user.findUnique({
    where: {
        username:req.body.username
    },

})

if(user.username==req.body.username){
    var msg= await NumeSugestie(req.body.username);
    res.send("Acest username este preluat de al utilizator, poti prelua acest username: "+ msg);

   
} } catch(err) {

   next();
}
    
}
       
       
       
     
    

  

  
   

  
  export default usernameExistsMiddleware;