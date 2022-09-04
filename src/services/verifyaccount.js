import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();



const createVerifyAccount= async (emailUsed, code,status) =>{
    const verifyAccount=await prisma.verifyAccount.create({
        data: {
            emailUsed:emailUsed,
            code:code,
            status:status
        }
    });
        return verifyAccount;
};

const getVerifyAccount= async (emailUsed) => {
    const verifyAccount = await prisma.verifyAccount.findUnique({
      where: {
        emailUsed:emailUsed
      },
    })
    return verifyAccount;
  };



  const getVerifyAccountById= async (id) => {
    const verifyAccount = await prisma.verifyAccount.findUnique({
      where: {
        id:id
      },
    })
    return verifyAccount;
  };

  const updateVerifyAccount = async (id, verifyAccountInfo) => {
    const verifyAccount = await prisma.verifyAccount.update({
      where: {
        id:id,
      },
      data: { ...verifyAccountInfo }
    })
    return verifyAccount;
  };







export default {createVerifyAccount, getVerifyAccount, getVerifyAccountById, updateVerifyAccount}