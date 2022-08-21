import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const deleteItemFromWhishList= async (wishlistid, itemid) => {


  const itemtowishlist = await prisma.itemtowishlist.findMany({
    where: {
      wishlistid:wishlistid,
      itemid:itemid
    }
  })

  const itemtowishlistDeleted = await prisma.itemtowishlist.delete({
    where: {
      id:itemtowishlist[0].id
    }
   
  })


  return itemtowishlistDeleted;
};





const getAllItemToWishList= async (id) => {
    const itemtowishlist = await prisma.itemtowishlist.findMany({
      where: {
        wishlistid:id
      },
      include: {
       items:true,
           
    }
    })
    return itemtowishlist;
  };

  const getitemToWishlist= async (wishlistid, itemid) => {
    const itemtowishlist = await prisma.itemtowishlist.findMany({
      where: {
        wishlistid:wishlistid,
        itemid:itemid
      }
    })
    return itemtowishlist;
  };





const createItemtoWishlist= async (wishlistid ,itemid) =>{
    const itemtowishlist=await prisma.itemtowishlist.create({
        data: {
            wishlistid:wishlistid,
            itemid:itemid,
            createdAt:new Date()
        }
    });
        return itemtowishlist;
};


const updateItemtoWishlist= async (id, itemtowishlistInfo) => {

  const itemtowishlistUpdated = await prisma.itemtowishlist.update({
    where: {
      id:id
    },
    data: { ...itemtowishlistInfo}
  })
  return itemtowishlistUpdated;
};





export default {createItemtoWishlist, getAllItemToWishList, deleteItemFromWhishList, updateItemtoWishlist, getitemToWishlist}