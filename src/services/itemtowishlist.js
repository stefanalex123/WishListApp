import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import wishlistServices from "../services/wishlist.js"

const deleteItemFromWishlist= async (wishlistId, itemId) => {


  const itemToWishlist = await prisma.itemToWishlist.findMany({
    where: {
      wishlistId:wishlistId,
      itemid:itemId
    }
  })

  const itemToWishlistDeleted = await prisma.itemToWishlist.delete({
    where: {
      id:itemToWishlist[0].id
    }
   
  })


  return itemToWishlistDeleted;
};

const getAllWishlistItems= async (id) => {
  const itemToWishlist = await prisma.itemToWishlist.findMany({
    where: {
      wishlistId:id
    },
    include: {
     items:true,
         
  }
  })
  return itemToWishlist;
};




const getAllItemToWishlist= async (id) => {
    const itemToWishlist = await prisma.itemToishlist.findMany({
      where: {
        wishlistId:id
      },
      include: {
       items:true,
       wishlist:true
           
    }
    })
    return itemToWishlist;
  };

  const getItemToWishlist= async (wishlistId, itemId) => {
    const itemToWishlist = await prisma.itemToWishlist.findMany({
      where: {
        wishlistId:wishlistId,
        itemId:itemId
      }
    })
    return itemToWishlist;
  };





const createItemToWishlist= async (wishlistId ,itemId) =>{
    const itemToWishlist=await prisma.itemToWishlist.create({
        data: {
            wishlistId:wishlistId,
            itemId:itemId,
            createdAt:new Date()
        }
    });
   

        return itemToWishlist;
};


const updateItemToWishlist= async (id, itemToWishlistInfo) => {

  const itemToWishlistUpdated = await prisma.itemToWishlist.update({
    where: {
      id:id
    },
    data: { ...itemToWishlistInfo}
  })
  return itemToWishlistUpdated;
};





export default {createItemToWishlist, getAllWishlistItems,getAllItemToWishlist, deleteItemFromWishlist, updateItemToWishlist, getItemToWishlist}