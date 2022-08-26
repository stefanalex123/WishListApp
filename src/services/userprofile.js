import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const deleteUserProfile = async (id) => {
    const userProfile = await prisma.userProfile.delete({
        where: {
            userId: id
        }
    });
    return userProfile;
};


const getUserProfile= async (id) => {
    const userProfile = await prisma.userProfile.findUnique({
      where: {
        userId:id
      }
    })
    return userProfile;
  };



const createUserProfile= async (userId, email ,nickname, phoneNumber) =>{
    const userProfile=await prisma.userProfile.create({
        data: {
            userId:userId,
            email:email,
            nickname:nickname,
            phoneNumber:phoneNumber
        }
    });
        return userProfile;
};


const updateUserProfile = async (id, userProfileInfo) => {
    const userProfile = await prisma.userProfile.update({
      where: {
        userid: id
      },
      data: { ...userProfileInfo }
    })
    return userProfile;
  };

export default {createUserProfile, updateUserProfile, getUserProfile, deleteUserProfile};