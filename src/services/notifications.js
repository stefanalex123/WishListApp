import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();



const getallnotifications= async (id) => {
    const allnotifications = await prisma.notifications.findMany({
      where: {
        userdeliverid:id
      }
    })
    return allnotifications;
  };

  const createnotification= async (notificationdescription,deliverat, userdeliverid) =>{
    const createnotification=await prisma.notifications.create({
        data: {
          notificationdescription:notificationdescription,
          deliverat:deliverat,
          userdeliverid:userdeliverid
        }
    });
        return createnotification;
};



  export default {getallnotifications, createnotification}