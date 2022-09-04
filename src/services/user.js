import { PrismaClient } from "@prisma/client";
import { geneateAuthToken } from "../utils/auth.js";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();


const getUser = async(username) => {
   
            const user =await prisma.user.findMany({
                where: {    
                    username:username                     
                }
      });

 
    return user;
    };

    const getUserById = async(id) => {
   
        const user =await prisma.user.findUnique({
            where: {    
                id:id                 
            }
  });


return user;
};


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

    const updatePasswordUser = async (id, userInfo) => {
        const userNewPassword = await prisma.user.update({
          where: {
            id: id
          },
          data: { ...userInfo }
        })
        return userNewPassword;
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


const addUserByReferralLink = async(username, password) => {
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




export default { addUser,loginUser, addUserByReferralLink, getUser, updatePasswordUser, getUserById};