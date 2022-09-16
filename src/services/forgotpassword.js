import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();



const deleteForgotPassword = async (id) => {
  const forgotPassword = await prisma.mailsForgotPassword.delete({
      where: {
          id:id
      }
  });
  return forgotPassword;
};



const createForgotPassword= async (emailUsed, code,status) =>{
    const forgotPassword=await prisma.mailsForgotPassword.create({
        data: {
            emailUsed:emailUsed,
            code:code,
            status:status,
            //deliverAt:Date.now()
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


  const getAllForgotPasswords= async () => {
    const allForgotPasswords = await prisma.mailsForgotPassword.findMany()

    return allForgotPasswords;
  };







export default {deleteForgotPassword,getAllForgotPasswords,createForgotPassword, getForgotPassword, getForgotPasswordById, updateForgotPassword}