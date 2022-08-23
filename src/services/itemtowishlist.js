import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import wishlistServices from "../services/wishlist.js"

const deleteitemfromshishlist= async (wishlistid, itemid) => {


  const itemtowishlist = await prisma.itemtowishlist.findMany({
    where: {
      wishlistid:wishlistid,
      itemid:itemid
    }
  })

  const itemtowishlistdeleted = await prisma.itemtowishlist.delete({
    where: {
      id:itemtowishlist[0].id
    }
   
  })


  return itemtowishlistdeleted;
};

const getallwishlistItems= async (id) => {
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




const getallitemtowishlist= async (id) => {
    const itemtowishlist = await prisma.itemtowishlist.findMany({
      where: {
        wishlistid:id
      },
      include: {
       items:true,
       wishlist:true
           
    }
    })
    return itemtowishlist;
  };

  const getitemtowishlist= async (wishlistid, itemid) => {
    const itemtowishlist = await prisma.itemtowishlist.findMany({
      where: {
        wishlistid:wishlistid,
        itemid:itemid
      }
    })
    return itemtowishlist;
  };





const createitemtowishlist= async (wishlistid ,itemid) =>{
    const itemtowishlist=await prisma.itemtowishlist.create({
        data: {
            wishlistid:wishlistid,
            itemid:itemid,
            createdat:new Date()
        }
    });
   

        return itemtowishlist;
};


const updateitemtowishlist= async (id, itemtowishlistInfo) => {

  const itemtowishlistupdated = await prisma.itemtowishlist.update({
    where: {
      id:id
    },
    data: { ...itemtowishlistInfo}
  })
  return itemtowishlistupdated;
};





export default {createitemtowishlist, getallwishlistItems,getallitemtowishlist, deleteitemfromshishlist, updateitemtowishlist, getitemtowishlist}