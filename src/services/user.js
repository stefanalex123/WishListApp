import { PrismaClient } from "@prisma/client";
import { geneateAuthToken } from "../utils/auth.js";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();



const addUser = async(username, password) => {
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

const loginUser = async (username,password) => {
    const existingUser = await prisma.user.findUnique({
        where: {
            username:username,
        }
    });

 
    if (!existingUser) {

        return "InvalidUser";
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);
    if(!validPassword){
        return "InvalidPassword"
    }

    return geneateAuthToken(existingUser.id);
}




export default { addUser,loginUser};