import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const deleteUserProfile = async (id) => {
    const userprofile = await prisma.userProfile.delete({
        where: {
            userid: id
        }
    });
    return userprofile;
};


const getUserProfile= async (id) => {
    const userProfile = await prisma.userProfile.findUnique({
      where: {
        userid:id
      }
    })
    return userProfile;
  };



const createuserprofile= async (userid, email ,nickname, phonenumber) =>{
    const userprofile=await prisma.userProfile.create({
        data: {
            userid:userid,
            email:email,
            nickname:nickname,
            phonenumber:phonenumber
        }
    });
        return userprofile;
};


const updateUserProfile = async (id, userProfileInfo) => {
    const userprofile = await prisma.userProfile.update({
      where: {
        userid: id
      },
      data: { ...userProfileInfo }
    })
    return userprofile;
  };

export default {createuserprofile, updateUserProfile, getUserProfile, deleteUserProfile};