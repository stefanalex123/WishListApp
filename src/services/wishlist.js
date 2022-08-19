import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const getAllWishlists= async (id) => {
    const wishlist = await prisma.wishlist.findMany({
      where: {
        userid:id
      }
    })
    return wishlist;
  };



const getWishList= async (id) => {
    const wishlist = await prisma.wishlist.findUnique({
      where: {
        id:id
      }
    })
    return wishlist;
  };

const createWishlist= async (userid ,wishlistname, wishlistdescription) =>{
    const wishlist=await prisma.wishlist.create({
        data: {
            userid:userid,
            wishlistname:wishlistname,
            wishlistdescription:wishlistdescription,
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

export default {createWishlist, getWishList, updateWishList, getAllWishlists, deleteWishlist}
