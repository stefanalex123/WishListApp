import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const deleteitem = async (id) => {
  const item = await prisma.items.delete({
      where: {
          id: id
      }
  });
  return item;
};

const getitem= async (id) => {
    const item = await prisma.items.findUnique({
      where: {
        id:id
      }
    })
    return item;
  };

  const getallitems= async (id) => {
    const item = await prisma.items.findMany({
      where: {
        userid:id
      }
    })
    return item;
  };

  const getallitemsWishlist= async (id) => {
    const item = await prisma.items.findMany({
      where: {
        userid:id
      }
    })
    return item;
  };





const createitem= async (itemname, userid ,itemlink, itemdescription) =>{
    const item=await prisma.items.create({
        data: {
            itemname:itemname,
            userid:userid,
            itemlink:itemlink,
            itemdescription:itemdescription
        }
    });
        return item;
};


const updateitem = async (id, itemInfo) => {
    const item = await prisma.items.update({
      where: {
        id: id
      },
      data: { ...itemInfo }
    })
    return item;
  };

export default {createitem, updateitem, getitem, getallitems}