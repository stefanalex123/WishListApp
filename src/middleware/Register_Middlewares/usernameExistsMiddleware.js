import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function randomIntFromInterval(min, max) { 
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
    res.status(409).send("This username is not available, you can take this username: "+ msg);

   
} } catch(err) {

   next();
}
    
}
       
  export default usernameExistsMiddleware;