import notificationController from "../FINAL_PROJECT2/src/controllers/notifications.js"
import notificationsServices from "./src/services/notifications.js";
import { PrismaClient } from "@prisma/client";
import nodeCron from "node-cron"
const prisma = new PrismaClient();



const jobDeleteSeenNotifications = nodeCron.schedule("12 12 12 12 *", async function jobYouNeedToExecute() {
    // Do whatever you want in here. Send email, Make  database backup or download data.
const allNotifications = await notificationsServices.getAllNotificationForAllUsers();
const currentDate =Date.now()



for(let i=0; i<allNotifications.length;i++){
const currentDate=Date.now()
const notificationDate=allNotifications[i].deliverAt
const diffTime=Math.abs(currentDate-notificationDate)
const diffMinutes = Math.ceil(diffTime / (1000 * 60)); 


    if(allNotifications[i].status=="SEEN" && diffMinutes>=1440){
        //delete this notification
        try {
            await notificationsServices.deleteNotification(allNotifications[i].id)
        } catch (err) {
            console.log(err);
        }
    }

}
    //console.log("TEST");
  });


  export default jobDeleteSeenNotifications;