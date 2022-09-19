import buyItemServices from "../services/buyitem.js";
import itemservice from "../services/item.js";
import userprofileService from "../services/userprofile.js";
import notificationsServices from "../services/notifications.js"

import sendmail from "../../sendmail.js"
import e from "express";



const getAllBuyersForItem= async (req, res, next) => {
  try {
      const allBuyersForItem=await buyItemServices.getBuyersForItem(req.params.itemId);
      if(allBuyersForItem.length==0){
        res.send("This item doesn't have any principal buyer")
      }
      else {
      res.json(allBuyersForItem)
      }
  } catch (err) {
      next(err);
  }
};

  const getAllContributionInvitationForUserAsked = async (req, res, next) => {
    try {
        var allContributionsForUser=await contributionInvitationsServices.getAllContributionInvitationsForUser(req.auth.userId);
        res.json(allContributionsForUser)
    } catch (err) {
        next(err);
    }
  };

const createBuyItem = async (req,res,next) => {
    try{
        const item = await itemservice.getItem(req.params.itemId);
  

       let  newBuyItem= await buyItemServices.createBuyItem(req.auth.userId, req.params.itemId)
        
        // modificam statusul itemului in indisponibil
        try {

  
            if (!item) {
              throw { message: "Item not found" };
            }
            const response = await itemservice.updateItem(req.params.itemId, {
              userId: item.userId,
              itemTitle: item.itemTitle,
              itemLink: item.itemLink,
              itemDescription:item.itemDescription,
              status:"INDISPONIBILE"
            });
          } catch (err) {
            console.error(`Error while updating item`);
            next(err);
          }

        // Trimitem o notificare catre proprietarul itemului ca a fost cumparat
        
      
        
        const user=await userprofileService.getUserProfile(req.auth.userId) 
        const userOwnerItem=await userprofileService.getUserProfile(item.userId)
        const newNotification= await notificationsServices.createNotification(
        "Itemul pe care il detii" + " "+item.itemName+ " "+"a fost cumparat de" + " " + user.nickname+ " " ,item.userId
        )
        if(user.mailsNotifications=="ON"){
          sendmail("Notification", "Itemul pe care il detii" + " " + item.itemName + " " + " a fost cumparat de" + " " + user.nickname+ " ", userOwnerItem.email)
        }

        res.json(newBuyItem);

    } catch (err){
        next(err);
    }

};

export default {createBuyItem, getAllBuyersForItem}
