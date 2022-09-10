import contributionInvitationsServices from "../services/contributioninvitation.js";
import itemService from "../services/item.js";
import userProfile from "../services/userprofile.js";
import userProfileServices from "../services/userprofile.js";
import notificationsServices from "../services/notifications.js";

const getAllContributorsForItem= async (req, res, next) => {
  try {
      const allContributorsForItem=await contributionInvitationsServices.getContributorsForItem(req.params.itemId);
      if(allContributorsForItem.length==0){
        res.send("Nobody contributed for this item")
      }
      else {
      res.json(allContributorsForItem)
      }
  } catch (err) {
      next(err);
  }
};

const updateContributionInvitation = async (req, res, next) => {
    try {
    
  
      const contributionInvitation = await contributionInvitationsServices.getContributionInvitation2(req.params.invitationId)
  
      if (!contributionInvitation) {
        throw { message: "Contribution Invitation Not Found" };
      }

      const contributionInvitationUpdated=await contributionInvitationsServices.updateContributionInvitation(req.params.invitationId, {
         status:req.body.status,
      });

      const userAsked=await userProfileServices.getUserProfile(contributionInvitationUpdated.userAskedId)
      const userContributer=await userProfileServices.getUserProfile(contributionInvitationUpdated.userContributerId)
      const item=await itemService.getItem(contributionInvitationUpdated.itemId)
    
      // Trimitem notificare celui care a facut invitatia de colaboare ca am refuzat/acceptat
      const newNotificaton= await notificationsServices.createNotification(
      "Utilizatorul" + userAsked.nickname + "a raspuns invitatiei cu " + req.body.status + "pentru itemul " + item.itemName, contributionInvitationUpdated.userContributerId
      )
      if(userContributer.mailsNotifications=="ON"){
        sendmail("Notification", "Utilizatorul" + userAsked.nickname + "a raspuns invitatiei cu " + req.body.status + "pentru itemul " + item.itemName, userContributer.email)
      }



        if(req.body.status=="ACCEPTED"){
      // Trimitem notificare utilizatorului care detine itemul ca are un nou colaborator
      const newNotificaton= await notificationsServices.createNotification(
        "Utilizatorul " + userContributer.nickname + " este un nou colaborator pentru itemul " + item.itemName, item.userId
      )


      if(userAsked.mailsNotifications=="ON"){
        sendmail("Notification", "Utilizatorul " + userContributer.nickname + " este un nou colaborator pentru itemul " + item.itemName, userAsked.email)
      }

      }

      

      res.send("Ai raspuns la invitatie")
      
    } catch (err) {
      console.error(`Error while updating Invitation`);
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

  const createContributionInvitation = async (req,res,next) => {
    try{
        const newContributionInvitation= await contributionInvitationsServices.createContributionInvitation(req.params.itemId, req.auth.userId, req.body.userId)
        //Trimitem o notificare catre utilizator cu care vrem sa colaboram
          const item= await itemService.getItem(req.params.itemId)
          const user=await userProfileServices.getUserProfile(req.auth.userId)
          const newNotification= await notificationsServices.createNotification(
          "Ai primit o invitatie de colaborare pentru itemul  " + item.itemName + "de la utilizatorul " + " " + user.nickname, req.body.userId
           )

           if(user.mailsNotifications=="ON"){
            sendmail("Notification", "Ai primit o invitatie de colaborare pentru itemul  " + item.itemName + "de la utilizatorul " + " " + user.nickname + item.itemName, user.email)
          }

        res.json(newContributionInvitation);
    } catch (err){
        next(err);
    }

};


const deteleContributionInvitation = async (req, res, next) => {
    try {
        await contributionInvitationsServices.deleteContributionInvitation(req.params.itemId, req.auth.userId);
        res.send("Contribution Invitation deleted");
    } catch (err) {
        next(err);
    }
  };



  export default {getAllContributorsForItem ,deteleContributionInvitation, getAllContributionInvitationForUserAsked, createContributionInvitation, updateContributionInvitation}