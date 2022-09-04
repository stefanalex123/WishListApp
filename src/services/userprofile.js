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

  const getUserProfileByEmail= async (email) => {
    const userProfile = await prisma.userProfile.findUnique({
      where: {
        email:email
      }
    })
    return userProfile;
  };





const createUserProfile= async (userId, email ,nickname, phoneNumber, mailsNotifications, birthday) =>{
    const userProfile=await prisma.userProfile.create({
        data: {
            userId:userId,
            email:email,
            nickname:nickname,
            phoneNumber:phoneNumber,
            mailsNotifications:mailsNotifications,
            birthday:birthday,
            socketId:"0",
            verifiedAccount:"UNVERIFIED"
    
            
        }
    });
        return userProfile;
};


const updateUserProfile = async (id, userProfileInfo) => {
    const userProfile = await prisma.userProfile.update({
      where: {
        userId: id
      },
      data: { ...userProfileInfo }
    })
    return userProfile;
  };

export default {createUserProfile, updateUserProfile, getUserProfile, deleteUserProfile, getUserProfileByEmail};