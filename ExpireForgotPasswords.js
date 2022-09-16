import notificationController from "../FINAL_PROJECT2/src/controllers/notifications.js"
import notificationsServices from "./src/services/notifications.js";
import forgotPasswordServices from "./src/services/forgotpassword.js"
import { PrismaClient } from "@prisma/client";
import nodeCron from "node-cron"
const prisma = new PrismaClient();



const jobDeleteActiveForgotPassword = nodeCron.schedule("12 12 12 12 *", async function jobYouNeedToExecute() {
    // Do whatever you want in here. Send email, Make  database backup or download data.

console.log("TEEEEEEST")
const allForgotPasswords=await forgotPasswordServices.getAllForgotPasswords()
console.log(allForgotPasswords)

for(let i=0; i<allForgotPasswords.length;i++){
const currentDate=Date.now()
const forgotpasswordDate=allForgotPasswords[i].deliverAt;
const diffTime=Math.abs(currentDate-forgotpasswordDate)
const diffMinutes = Math.ceil(diffTime / (1000 * 60)); 


    if(diffMinutes>=2){
        //delete this notification
        try {
            await forgotPasswordServices.deleteForgotPassword(allForgotPasswords[i].id)
            
        } catch (err) {
            console.log(err);
        }
    }

}
    //console.log("TEST");
  });


  export default jobDeleteActiveForgotPassword;