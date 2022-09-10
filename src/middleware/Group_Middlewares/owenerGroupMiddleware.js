import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


//Verify_if_Owner_Group
const owenerGroupMiddleware= async ( req, res, next) => {
    try{
    const group = await prisma.group.findUnique({
        where: {
           id:req.params.id
        },
    
    })

    if(group.groupOwnerId==req.auth.userId){
        next();
    }
    else {
        res.send("You are not the owner of this group!")
    }

       
    }  catch(err) {
    
       res.send("This group doesn't exists!")
    }
    }

    export default owenerGroupMiddleware
          