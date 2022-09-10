import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getAllNotificationForAllUsers = async () => {
  const allNotificationForAllUsers = await prisma.notifications.findMany()
  return allNotificationForAllUsers;
};

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
          status:"PENDING"
          
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

const deleteNotification = async (id) => {
  const notification = await prisma.notifications.delete({
      where: {
          id:id
      }
  });
  return notification;
};



  export default {getAllNotifications, createNotification, updateNotification, getNotification,
                 getAllNotificationForAllUsers, deleteNotification}