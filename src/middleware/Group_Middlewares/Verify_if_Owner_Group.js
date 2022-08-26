import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


const Verify_if_Owner_Group = async ( req, res, next) => {
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
        res.send("Nu esti owner in acest grup")
    }

       
    }  catch(err) {
    
       res.send("Acest grup nu exista in baza de date")
    }
    }

    export default Verify_if_Owner_Group
          