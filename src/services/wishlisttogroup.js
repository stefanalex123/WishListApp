import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const deleteWishlistToGroup= async (groupId, wishlistId) => {


  const wishlistToGroup = await prisma.wishlistToGroup.findMany({
    where: {
    groupId:groupId,
    wishlistId:wishlistId,
    }
  })

  const wishlistToGroupDeleted = await prisma.wishlistToGroup.delete({
    where: {
      id:wishlistToGroup[0].id
    }
   
  })


  return wishlistToGroupDeleted;
};





const getAllWishlistToGroup= async (id) => {
    const wishlistToGroup = await prisma.wishlistToGroup.findMany({
      where: {
        groupId:id
      },
      include: {
       wishlist:true,
       
           
    }
    })
    return wishlistToGroup;
  };



  const getWishlistToGroup= async (groupId, wishlistId) => {
    const wishlistToGroup = await prisma.wishlistToGroup.findMany({
      where: {
        groupId:groupId,
        wishlistId:wishlistId
      }
    })
    return wishlistToGroup;
  };





const createWishlistToGroup= async (groupId ,wishlistId) =>{
    const wishlistToGroup=await prisma.wishlistToGroup.create({
        data: {
            groupId:groupId,
            wishlistId:wishlistId,
            createdAt:new Date()
        }
    });
        return wishlistToGroup;
};


const updateWishlistToGroup= async (id, wishlistToGroupInfo) => {

  const wishlistToGroupUpdated = await prisma.wishlistToGroup.update({
    where: {
      id:id
    },
    data: { ...wishlistToGroupInfo}
  })
  return wishlistToGroupUpdated;
};





export default {deleteWishlistToGroup,getAllWishlistToGroup, getWishlistToGroup, createWishlistToGroup, updateWishlistToGroup}