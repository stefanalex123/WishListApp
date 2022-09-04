import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();



const createForgotPassword= async (emailUsed, code,status) =>{
    const forgotPassword=await prisma.mailsForgotPassword.create({
        data: {
            emailUsed:emailUsed,
            code:code,
            status:status
        }
    });
        return forgotPassword;
};

const getForgotPassword= async (emailUsed) => {
    const forgotPassword = await prisma.mailsForgotPassword.findUnique({
      where: {
        emailUsed:emailUsed
      },
    })
    return forgotPassword;
  };

  const getForgotPasswordById= async (id) => {
    const forgotPassword = await prisma.mailsForgotPassword.findUnique({
      where: {
        id:id
      },
    })
    return forgotPassword;
  };

  const updateForgotPassword = async (id, forgotPasswordInfo) => {
    const forgotPassword = await prisma.mailsForgotPassword.update({
      where: {
        id: id
      },
      data: { ...forgotPasswordInfo }
    })
    return updateForgotPassword;
  };







export default {createForgotPassword, getForgotPassword, getForgotPasswordById, updateForgotPassword}