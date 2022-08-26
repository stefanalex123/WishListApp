import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();



const getAllNotifications= async (id) => {
    const allNotifications = await prisma.notifications.findMany({
      where: {
        userDeliverId:id
      }
    })
    return allNotifications;
  };

  const createNotification= async (notificationDescription,deliverAt, userdeliverId) =>{
    const createNotification=await prisma.notifications.create({
        data: {
          notificationDescription:notificationDescription,
          deliverAt:deliverAt,
          userdeliverId:userdeliverId
        }
    });
        return createNotification;
};



  export default {getAllNotifications, createNotification}