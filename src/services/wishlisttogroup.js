import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const deletewishlistrogroup= async (groupid, wishlistid) => {


  const wishlisttogroup = await prisma.wishlisttogroup.findMany({
    where: {
    groupid:groupid,
    wishlistid:wishlistid,
    }
  })

  const wishlisttogroupDeleted = await prisma.wishlisttogroup.delete({
    where: {
      id:wishlisttogroup[0].id
    }
   
  })


  return wishlisttogroupDeleted;
};





const getAllwishlisttogroup= async (id) => {
    const wishlisttogroup = await prisma.wishlisttogroup.findMany({
      where: {
        groupid:id
      },
      include: {
       wishlist:true,
           
    }
    })
    return wishlisttogroup;
  };



  const getwishlisttogroup= async (groupid, wishlistid) => {
    const wishlisttogroup = await prisma.wishlisttogroup.findMany({
      where: {
        groupid:groupid,
        wishlistid:wishlistid
      }
    })
    return wishlisttogroup;
  };





const createwishlisttogroup= async (groupid ,wishlistid) =>{
    const wishlisttogroup=await prisma.wishlisttogroup.create({
        data: {
            groupid:groupid,
            wishlistid:wishlistid,
            createdAt:new Date()
        }
    });
        return wishlisttogroup;
};


const updatewishlisttogroup= async (id, wishlisttogroupInfo) => {

  const wishlisttogroupUpdated = await prisma.wishlisttogroup.update({
    where: {
      id:id
    },
    data: { ...wishlisttogroupInfo}
  })
  return wishlisttogroupUpdated;
};





export default {deletewishlistrogroup,getAllwishlisttogroup, getwishlisttogroup, createwishlisttogroup, updatewishlisttogroup}