import groupsInvitationServices from "../services/groupsinvitations.js";
import notificationsServices from "../services/notifications.js";
import groupServices from "../services/groups.js";
import userProfileServices from "../services/userprofile.js";

const updateGroupInvitation = async (req, res, next) => {
    try {
    
      const response = await groupsInvitationServices.updateGroupInvitation(req.params.invitationId, {
         status:req.body.status,    
      });

      //Trimitem o notificare ownerului grupului cu raspunsul la invitatia acestuia
       const user=await userProfileServices.getUserProfile(req.auth.userId)
       const groupInvitation=await groupsInvitationServices.getGroupinvitationById(req.params.invitationId)
       const group=await groupServices.getGroup(groupInvitation.groupId)
      const newNotificaton= await notificationsServices.createNotification(
         "Utilizatorul" + user.nickname + "a raspuns invitatiei cu " + req.body.status + "pentru grupul" + group.groupTitle, Date.now(), group.groupOwnerId
      )
      res.json("Group Invitation Updated");
    } catch (err) {
      console.error(`Error while updating Invitation`);
      next(err);
    }
  };


const getGroupAllInvitations = async (req, res, next) => {
    try {
        var groupAllInvitations=await groupsInvitationServices.getAllGroupInvitations(req.params.id);
        res.json(groupAllInvitations)
    } catch (err) {
        next(err);
    }
  };

const createGroupInvitation = async (req,res,next) => {
    try{
        const newGroupInvitation= await groupsInvitationServices.createGroupInvitation(req.params.id, req.body.userInvitedId)
        //Trimitem o notificare catre userinvitedid ca fost invitat sa acceseze un grup
        const group=await groupServices.getGroup(req.params.id)
        const newNotificaton= await notificationsServices.createNotification(
        "Ai primit o invitatie de la grupul " + group.groupTitle +" " , Date.now(),req.body.userInvitedId
        )
        res.json(newGroupInvitation);
    } catch (err){
        next(err);
    }

};


const deleteGroupInvitation = async (req, res, next) => {
    try {
        await groupsInvitationServices.deleteGroupInvitation(req.params.id, req.params.userInvitedId);
        res.send("Group invitation deleted");
    } catch (err) {
        next(err);
    }
  };

  const getAllInvitationsForUser = async (req, res, next) => {
    try {
        const allInvitationsForUser=await groupsInvitationServices.getAllInvitationsForUser(req.auth.id);
        res.json(allInvitationsForUser)
    } catch (err) {
        next(err);
    }
  };


export default {updateGroupInvitation, getAllInvitationsForUser , createGroupInvitation, deleteGroupInvitation, getGroupAllInvitations}