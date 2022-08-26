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


const updateWishList = async (id, wishlistInfo) => {
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

export default {createWishlist, getWishlist, updateWishList, getAllWishlists, deleteWishlist}
