import { PrismaClient } from "@prisma/client";
import { geneateAuthToken } from "../utils/auth.js";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();



const adduser = async(username, password) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

            const user =await prisma.user.create({
                data: {
                    username:username,
                    password:hash,
                    
                }
      });

 
    return user;
    };

const loginuser = async (username,password) => {
    const existinguser = await prisma.user.findUnique({
        where: {
            username:username,
        }
    });

 
    if (!existinguser) {

        return "InvalidUser";
    }

    const validPassword = await bcrypt.compare(password, existinguser.password);
    if(!validPassword){
        return "InvalidPassword"
    }

    return geneateAuthToken(existinguser.id);
}




export default { adduser,loginuser};