import groupsinvitationservices from "../services/groupsinvitations.js"

const updategroupinvitation = async (req, res, next) => {
    try {
    
  


      const response = await groupsinvitationservices.updategroupinvitation(req.params.invitationid, {

         status:req.body.status,   
         
        
      });




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