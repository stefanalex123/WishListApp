import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const deleteItem = async (id) => {
  const item = await prisma.items.delete({
      where: {
          id: id
      }
  });
  return item;
};

const getItem= async (id) => {
    const item = await prisma.items.findUnique({
      where: {
        id:id
      }
    })
    return item;
  };

  const geAllItems= async (id) => {
    const item = await prisma.items.findMany({
      where: {
        userid:id
      }
    })
    return item;
  };





const createItem= async (ItemName, userid ,ItemLink, ItemDescription) =>{
    const item=await prisma.items.create({
        data: {
            itemname:ItemName,
            userid:userid,
            itemlink:ItemLink,
            itemdescription:ItemDescription
        }
    });
        return item;
};


const updateItem = async (id, itemInfo) => {
    const item = await prisma.items.update({
      where: {
        id: id
      },
      data: { ...itemInfo }
    })
    return item;
  };

export default {createItem, updateItem, getItem, geAllItems}