import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const getAllWishlists= async (id) => {
    const wishlist = await prisma.wishlist.findMany({
      where: {
        userId:id
      }
    })
    return wishlist;
  };



const getWishlist= async (id) => {
    const wishlist = await prisma.wishlist.findUnique({
      where: {
        id:id
      }
    })
    return wishlist;
  };

const createWishlist= async (userId ,wishlistName, wishlistDescription) =>{
    const wishlist=await prisma.wishlist.create({
        data: {
            userId:userId,
            wishlistName:wishlistName,
            wishlistDescription:wishlistDescription,
        }
    });
        return wishlist;
};


const updateWishlist = async (id, wishlistInfo) => {
    const wishlist = await prisma.wishlist.update({
      where: {
        id: id
      },
      data: { ...wishlistInfo }
    })
    return wishlist;
  };


  const deleteWishlist = async (id) => {
    const wishlist = await prisma.wishlist.delete({
        where: {
            id: id
        }
    });
    return wishlist;
  };

  const getAllWishlistPagination= async (id,page1,limitPage) => {
 
    const allWishlists = await prisma.wishlist.findMany({
      skip: (page1-1)*4,
      take: (limitPage-page1)*4+4,
      where:{
        userId:id
      }
    })
    return allWishlists;
  };

export default {createWishlist, getWishlist, updateWishlist, getAllWishlists, deleteWishlist, getAllWishlistPagination}
