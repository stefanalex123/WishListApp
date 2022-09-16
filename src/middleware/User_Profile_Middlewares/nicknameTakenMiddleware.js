import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

    async function  NumeSugestie(numeNou){

    try{
        const userprofile =  await prisma.userProfile.findUnique({
            where: {
                nickname:numeNou
            },
    
        })
        
        

        if(userprofile.nickname==numeNou){
        var NumeNouRandom= await randomIntFromInterval(10,90)
        return NumeSugestie(numeNou + NumeNouRandom);
        }
    } catch(err){
        return numeNou;
    }
    }



//Verify_if_Nickname_taken
const nicknameTakenMiddleware = async ( req, res, next) => {
try{
const userprofile = await prisma.userProfile.findUnique({
    where: {
        nickname:req.body.nickname
    },


})

if(userprofile.nickname==req.body.nickname){

    var msg= await NumeSugestie(req.body.nickname);
    res.status(409).send("This nickname is not available, you can try this nickname: "+ msg);

   
} } catch(err) {

   next();
}
    
}
       
       
       
     
    

  

  
   

  
  export default nicknameTakenMiddleware;