import buyItemServices from "../services/buyitem.js";
import itemservice from "../services/item.js";
import userprofileService from "../services/userprofile.js";


const getAllBuyersForItem= async (req, res, next) => {
  try {
      var allBuyersForItem=await buyItemServices.getBuyersForItem(req.params.itemId);
      res.json(allBuyersForItem)
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
        const newBuyItem= await buyItemServices.createBuyItem(req.auth.userId, req.params.itemId)
        // modificam statusul itemului in indisponibil
        try {
    
            const item = await itemService.getItem(req.params.itemId);
        
            if (!item) {
              throw { message: "Item not found" };
            }
        
            const response = await itemService.updateItem(req.params.itemId, {
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
        const item= await itemService.getItem(req.params.itemId)
        const user=await userProfileService.getUserProfile(req.auth.userId) 
        const newNotification= await notificationsServices.createNotification(
        "Itemul pe care il detii " + item.itemName + " a fost cumparat de  " + user.nickname+ " " , Date.now(), item.userId
        )
        res.json(newBuyItem);

    } catch (err){
        next(err);
    }

};

export default {createBuyItem, getAllBuyersForItem}
