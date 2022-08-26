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
      },
      include: {
        user:true
      }
       
      
    
      
     
      
    })
    return item;
  };

  const getAllItems= async (id) => {
    const item = await prisma.items.findMany({
      where: {
        userId:id
      }
    })
    return item;
  };

  const getAllItemsWishlist= async (id) => {
    const item = await prisma.items.findMany({
      where: {
        userId:id
      }
    })
    return item;
  };





const createItem= async (itemName, userId ,itemLink, itemDescription) =>{
    const item=await prisma.items.create({
        data: {
            itemName:itemName,
            userId:userId,
            itemLink:itemLink,
            itemDescription:itemDescription
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

export default {createItem, updateItem, getItem, getAllItems}