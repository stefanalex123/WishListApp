import groupServices from "../FINAL_PROJECT2/src/services/groups.js"
import { PrismaClient } from "@prisma/client";
import userProfileService from "../FINAL_PROJECT2/src/services/userprofile.js"
import isLeapYear from "leap-year";
import notificationsServices from "../FINAL_PROJECT2/src/services/notifications.js"
import nodeCron from "node-cron"
const prisma = new PrismaClient();



const job = nodeCron.schedule("12 12 12 12 *", async function jobYouNeedToExecute() {
    
    

    try {
        const allGroups=await groupServices.getAllGroups();
        
        for(let i=0; i<allGroups.length;i++){
          const allGroupInvitations = await prisma.groupInvitations.findMany({
            where: {
              groupId:allGroups[i].id,
              status:"ACCEPTED"
            },
          })

      
            for(let j=0; j<allGroupInvitations.length; j++){
                const userprofile=await userProfileService.getUserProfile(allGroupInvitations[j].userInvitedId)
                
                const userBirthday=userprofile.birthday;
                const date=new Date();
                const userBirthdayDay=userBirthday.substring(0,2)
                const userBirthdayMonth=userBirthday.substring(3,5)
                const userBithdayYear=userBirthday.substring(6,10)
                const currentDay=date.getDate()
                const currentMonth=date.getMonth()+1
                const currentYear=date.getFullYear()
                  if(currentMonth==userBirthdayDay && userBirthdayDay-currentDay>=1 && userBirthdayDay-currentDay<=7){
                    console.log("aici?")

                    // Mai sunt userBirhDay- currentDay zile pana la ziua lui user
                      for(let l=0; l<allGroupInvitations.length; l++){
                        if(allGroupInvitations[l].userInvitedId!=userprofile.userId){
                          //console.log(userBirthdayDay-currentDay)
                          let days=userBirthdayDay-currentDay;
                          let daysTxt=days.toString();
                        const newNotificaton= await notificationsServices.createNotification(
                         "Mai sunt" +" " + daysTxt + " " + "zile pana la ziua lui" +" " + userprofile.nickname 
                         +" "+ "de pe grupul" +" " + allGroups[i].groupTitle,
                           allGroupInvitations[l].userInvitedId
                          )
  
                      }
                    }
                    
  
                }
  
                  if(currentMonth==userBirthdayMonth-1 && 
                  (currentMonth==1 || currentMonth==3 || currentMonth==5
                   || currentMonth==7 || currentMonth==8 || currentMonth==10  || currentMonth==12 )
                   && currentDay+userBirthdayDay<=38 && currentDay+ userBirthdayDay>=32){
                        //Mai sunt (currentDat+userBirthday-1)%10 zile pana la ziua lui user
                        
                        for(let l=0; l<allGroupInvitations.length; l++){
                          if(allGroupInvitations[l].userInvitedId!=userprofile.userId){
                            let days=(userBirthdayDay+currentDay-1)%10;
                            let daysTxt=days.toString();
                          const newNotificaton= await notificationsServices.createNotification(
                           "Mai sunt" + " " + daysTxt + " "+  "zile" + " " + "pana la ziua lui" +" " + userprofile.nickname 
                           +" "+ "de pe grupul" +" " + allGroups[i].groupTitle,
                          
                             allGroupInvitations[l].userInvitedId
                            )
    
                        }
                      }
  
                   }
  
                   
                  if(currentMonth==userBirthdayMonth-1 && (currentMonth==4 || currentMonth==6 || currentMonth==9
                    || currentMonth==11) && currentDay+userBirthdayDay<=37 && currentDay+ userBirthdayDay>=31){
                       //Mai sunt (currentDat+userBirthday)%10 zile pana la ziua lui user
  
                       for(let l=0; l<allGroupInvitations.length; l++){
                        if(allGroupInvitations[l].userInvitedId!=userprofile.userId){
                          let days=(userBirthdayDay+currentDay)%10;
                          let daysTxt=days.toString();
                        const newNotificaton= await notificationsServices.createNotification(
                         "Mai sunt" + " " + daysTxt+" " + "zile" +" " +"pana la ziua lui" +" " + userprofile.nickname 
                         +" "+ "de pe grupul" +" " + allGroups[i].groupTitle,
                     
                           allGroupInvitations[l].userInvitedId
                          )
  
                      }
                    }
                      
                    }
  
                  if(currentMonth==userBirthdayMonth-1 && currentMonth==2 && isLeapYear(currentYear)==true
                    && currentDay+userBirthdayDay<=36 && currentDay+ userBirthdayDay>=30){
                      //Mai sunt (currentDat+userBirthday+1)%10 zile pana la ziua lui user
  
                      for(let l=0; l<allGroupInvitations.length; l++){
                        if(allGroupInvitations[l].userInvitedId!=userprofile.userId){

                          let days=(userBirthdayDay+currentDay+1)%10;
                        let daysTxt=days.toString();
                        const newNotificaton= await notificationsServices.createNotification(
                         "Mai sunt" + " " + daysTxt + " " + "zile"+" " +"pana la ziua lui" +" " + userprofile.nickname 
                         +" "+ "de pe grupul" +" " + allGroups[i].groupTitle,
                          
                           allGroupInvitations[l].userInvitedId
                          )
  
                      }
                    }
                  }
  
                  if(currentMonth==userBirthdayMonth-1 && currentMonth==2 && isLeapYear(currentYear)==false
                    && currentDay+userBirthdayDay<=35 && currentDay+ userBirthdayDay>=29){
                      //Mai sunt (currentDat+userBirthday+2)%10 zile pana la ziua lui user
  
                      for(let l=0; l<allGroupInvitations.length; l++){
                        if(allGroupInvitations[l].userInvitedId!=userprofile.userId){
                          let days=(userBirthdayDay+currentDay+2)%10;
                          let daysTxt=days.toString();
                        const newNotificaton= await notificationsServices.createNotification(
                         "Mai sunt" + " " +daysTxt+" "+ "zile" +" "+"pana la ziua lui" +" " + userprofile.nickname 
                         +" "+ "de pe grupul" +" " + allGroups[i].groupTitle,
                        
                           allGroupInvitations[l].userInvitedId
                          )
  
                      }
                    }
                  }
  
  
                
                  
            }
     
        
        }
        
        
      } catch (err) {
        console.error(`Error while getting birthday notification`);
        next(err);
      }


  });
  

  export default job;