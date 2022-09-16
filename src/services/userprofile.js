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
            verifiedAccount:"UNVERIFIED",
            status:'PUBLIC'
    
            
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





  const getAllProfiles = async () => {
    const allProfiles = await prisma.userProfile.findMany({
      where:{
        status:"PUBLIC",
      },
      include:{
        userItems:true,
        userWishlists:{
          include:{
            wishlistItems:true,
          }
        },
      }
    })
    return allProfiles;
  };



  const getMyCompleteProfile = async (userId) => {
    const myCompleteProfile = await prisma.userProfile.findMany({
    where:{
      userId:userId,
    },
    include:{
      userItems:true,
      userWishlists:{
        include:{
          wishlistItems:true,
          wishlistGroups:true,
        }
      },
      user_group_invitation:{
        include:{
          group:true,
        }
      },
      userAdresses:true,
      itemBoughtByUsers:true,
      itemsBoughtByUserWithContribution:true,
      usersAskedForContribution:true,
      referralsInvitations:true,
      notifications:true,
    }
    })
    return myCompleteProfile;
  };

  const getAllPublicProfiles = async (userId) => {
    const allPublicProfiles = await prisma.userProfile.findMany({
    where:{
      status:"PUBLIC"
    },
    include:{
      userItems:true,
      userWishlists:{
        where:{
          wishlistItems:true,
          wishlistGroups:true,
        }
      },
      userAdresses:true,
      itemBoughtByUsers:true,
      itemsBoughtByUserWithContribution:true,
      usersAskedForContribution:true,
      referralsInvitations:true,
      //notifications:true,
    }
    })
    return allPublicProfiles;
  };



  
export default {getMyCompleteProfile,createUserProfile, updateUserProfile, getUserProfile, deleteUserProfile, getUserProfileByEmail, getAllProfiles};