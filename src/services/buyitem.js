import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createbuyitem= async (userbuyerid ,itemid) =>{
    const buyitem=await prisma.buyItem.create({
        data: {
            itemid:itemid,
            userbuyerid:userbuyerid,
            userstatus:"FirstBuyer"
        }
    });
   

        return buyitem;
};

const getbuyersforitem= async (id) => {
    const buyersforitem = await prisma.buyItem.findMany({
      where: {
        itemid:id
      },
      include: {
        user:true
      }
    })

return buyersforitem;
}









export default {createbuyitem, getbuyersforitem}