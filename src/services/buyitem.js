import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createBuyItem= async (userBuyerId ,itemId) =>{
    const buyItem=await prisma.buyItem.create({
        data: {
            itemId:itemId,
            userBuyerId:userBuyerId,
            userStatus:"FirstBuyer"
        }
    });
   

        return buyItem;
};

const getBuyersForItem= async (id) => {
    const buyersForItem = await prisma.buyItem.findMany({
      where: {
        itemId:id
      },
      include: {
        user:true
      }
    })

return buyersForItem;
}









export default {createBuyItem, getBuyersForItem}