import groupsinvitationservices from "../services/groupsinvitations.js"
import notificationsServices from "../services/notifications.js";
import groupServices from "../services/groups.js"
import userprofileServices from "../services/userprofile.js"

const updategroupinvitation = async (req, res, next) => {
    try {
    
      const response = await groupsinvitationservices.updategroupinvitation(req.params.invitationid, {
         status:req.body.status,    
      });

      //Trimitem o notificare ownerului grupului cu raspunsul la invitatia acestuia
       const user=await userprofileServices.getUserProfile(req.auth.userid)
       const groupinvitation=await groupsinvitationservices.getgroupinvitationbyid(req.params.invitationid)
       const group=await groupServices.getgroup(groupinvitation.groupid)
      const newnotificaton= await notificationsServices.createnotification(
         "Utilizatorul" + user.nickname + "a raspuns invitatiei cu " + req.body.status + "pentru grupul" + group.grouptitle, Date.now(), group.groupownerid
      )
      res.json("Group Invitation Updated");
    } catch (err) {
      console.error(`Error while updating Invitation`);
      next(err);
    }
  };


const getgroupallinvitations = async (req, res, next) => {
    try {
        var groupallinvitations=await groupsinvitationservices.getallgroupinvitations(req.params.id);
        res.json(groupallinvitations)
    } catch (err) {
        next(err);
    }
  };

const creategroupinvitation = async (req,res,next) => {
    try{
        const newgroupinvitation= await groupsinvitationservices.creategroupinvitation(req.params.id, req.body.userinvitedid)
        //Trimitem o notificare catre userinvitedid ca fost invitat sa acceseze un grup
        const group=await groupServices.getgroup(req.params.id)
        const newnotificaton= await notificationsServices.createnotification(
        "Ai primit o invitatie de la grupul " + group.grouptitle +" " , Date.now(),req.body.userinvitedid
        )
        res.json(newgroupinvitation);
    } catch (err){
        next(err);
    }

};


const deletegroupinvitation = async (req, res, next) => {
    try {
        await groupsinvitationservices.deletegroupinvitation(req.params.id, req.params.userInvitedid);
        res.send("Group invitation deleted");
    } catch (err) {
        next(err);
    }
  };

  const getallinvitationsforuser = async (req, res, next) => {
    try {
        const allinvitationsforuser=await groupsinvitationservices.getallinvitationsforuser(req.auth.id);
        res.json(allinvitationsforuser)
    } catch (err) {
        next(err);
    }
  };


export default {updategroupinvitation, getallinvitationsforuser , creategroupinvitation, deletegroupinvitation, getgroupallinvitations}