import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();



const getAllNotifications= async (id) => {
    const allNotifications = await prisma.notifications.findMany({
      where: {
        userdeliverId:id
      }
    })
    return allNotifications;
  };

  const createNotification= async (notificationDescription, userdeliverId) =>{
    const createNotification=await prisma.notifications.create({
        data: {
          notificationDescription:notificationDescription,
          userdeliverId:userdeliverId,
        }
    });
        return createNotification;
};


const updateNotification = async (id, notificationInfo) => {
  const notification = await prisma.notifications.update({
    where: {
      id:id,
    },
    data: { ...notificationInfo }
  })
  return notification;
};


const getNotification= async (id) => {
  const notification = await prisma.notifications.findUnique({
    where: {
      id:id
    },
  })
  return notification;
};



  export default {getAllNotifications, createNotification, updateNotification, getNotification}