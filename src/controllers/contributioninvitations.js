import contributionInvitationsServices from "../services/contributioninvitation.js";
import itemService from "../services/item.js";
import userProfile from "../services/userprofile.js";
import userProfileServices from "../services/userprofile.js";

const getAllContributorsForItem= async (req, res, next) => {
  try {
      var allContributorsForItem=await contributionInvitationsServices.getContributorsForItem(req.params.itemId);
      res.json(allContributorsForItem)
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

      await contributionInvitationsServices.updateContributionInvitation(req.params.invitationId, {
         status:req.body.status,
      });

      const user=await userProfileServices.getUserProfile(req.auth.userId)
      const theContributionInvitation= await contributionInvitationsServices.getContributionInvitation2(req.params.invitationId)
      const item=await itemService.getItem(theContributionInvitation.itemId)
    
      // Trimitem notificare celui care a facut invitatia de colaboare ca am refuzat/acceptat
      const newNotificaton= await notificationsServices.createNotification(
      "Utilizatorul" + user.nickname + "a raspuns invitatiei cu " + req.body.status + "pentru itemul " + item.itemname, Date.now(), theContributionInvitation.userAskedId
      )
      if(user.mailsNotifications=="ON"){
        sendmail("Notification", "Utilizatorul" + user.nickname + "a raspuns invitatiei cu " + req.body.status + "pentru itemul " + item.itemName, user.email)
      }



        if(req.body.status=="ACCEPTED"){
      // Trimitem notificare utilizatorului care detine itemul ca are un nou colaborator
      const newNotificaton= await notificationsServices.createNotification(
        "Utilizatorul " + user.nickname + " este un nou colaborator pentru itemul " + item.itemName, Date.now(), item.userId
      )


      if(user.mailsNotifications=="ON"){
        sendmail("Notification", "Utilizatorul " + user.nickname + " este un nou colaborator pentru itemul " + item.itemName, user.email)
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
        const newContributionInvitation= await contributionInvitationsServices.createContributionInvitation(req.params.itemId, req.auth.userId, req.body.userAskedId)
        //Trimitem o notificare catre utilizator cu care vrem sa colaboram
          const item= await itemService.getItem(req.params.itemId)
          const user=await userProfileServices.getUserProfile(req.auth.userId)
          const newNotification= await notificationsServices.createNotification(
          "Ai primit o invitatie de colaborare pentru itemul  " + item.itemName + "de la utilizatorul " + " " + user.nickname , Date.now(),req.body.userAskedId
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