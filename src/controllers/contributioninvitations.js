import contributioninvitationsServices from "../services/contributioninvitation.js"
import itemService from "../services/item.js"
import userprofile from "../services/userprofile.js";
import userprofileServices from "../services/userprofile.js"

const getallcontributorsforitem= async (req, res, next) => {
  try {
      var allcontributorsforitem=await contributioninvitationsServices.getcontributorsforitem(req.params.itemid);
      res.json(allcontributorsforitem)
  } catch (err) {
      next(err);
  }
};

const updatecontributioninvitation = async (req, res, next) => {
    try {
    
  
      const contributioninvitation = await contributioninvitationsServices.getcontributioninvitation2(req.params.invitationid)
  
      if (!contributioninvitation) {
        throw { message: "Contribution Invitation Not Found" };
      }

      await contributioninvitationsServices.updatecontributioninvitation(req.params.invitationid, {
         status:req.body.status,
      });

      const user=await userprofileServices.getUserProfile(req.auth.userid)
      const thecontributioninvitation= await contributioninvitationsServices.getcontributioninvitation2(req.params.invitationid)
      const item=await itemService.getitem(thecontributioninvitation.itemid)
    
      // Trimitem notificare celui care a facut invitatia de colaboare ca am refuzat/acceptat
      const newnotificaton= await notificationsServices.createnotification(
      "Utilizatorul" + user.nickname + "a raspuns invitatiei cu " + req.body.status + "pentru itemul " + item.itemname, Date.now(), thecontributioninvitation.useraskedid
      )
        if(req.body.status=="ACCEPTED"){
      // Trimitem notificare utilizatorului care detine itemul ca are un nou colaborator
      const newnotificaton= await notificationsServices.createnotification(
        "Utilizatorul " + user.nickname + " este un nou colaborator pentru itemul " + item.itemname, Date.now(), item.userid
      )
      }

      res.send("Ai raspuns la invitatie")
      
    } catch (err) {
      console.error(`Error while updating Invitation`);
      next(err);
    }
  };

  const getallcontributioninvitationforuserasked = async (req, res, next) => {
    try {
        var allcontributionsforuser=await contributioninvitationsServices.getallcontributioninvitationsforuser(req.auth.userid);
        res.json(allcontributionsforuser)
    } catch (err) {
        next(err);
    }
  };

  const createcontributioninvitation = async (req,res,next) => {
    try{
        const newcontributioninvitation= await contributioninvitationsServices.createcontributioninvitation(req.params.itemid, req.auth.userid, req.body.useraskedid)
        //Trimitem o notificare catre utilizator cu care vrem sa colaboram
          const item= await itemService.getitem(req.params.itemid)
          const user=await userprofileServices.getUserProfile(req.auth.userid)
          const newnotificaton= await notificationsServices.createnotification(
          "Ai primit o invitatie de colaborare pentru itemul  " + item.itemname + "de la utilizatorul " + " " + user.nickname , Date.now(),req.body.useraskedid
           )
    
        res.json(newcontributioninvitation);
    } catch (err){
        next(err);
    }

};


const detelecontributioninvitation = async (req, res, next) => {
    try {
        await contributioninvitationsServices.deletecontributioninvitation(req.params.itemid, req.auth.userid);
        res.send("Contribution Invitation deleted");
    } catch (err) {
        next(err);
    }
  };



  export default {getallcontributorsforitem   ,detelecontributioninvitation, getallcontributioninvitationforuserasked, createcontributioninvitation, updatecontributioninvitation}