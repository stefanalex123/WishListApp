import groupsinvitationServices from "../services/groupsinvitations.js"

const getGroupAllInvitations = async (req, res, next) => {
    try {
        var groupallinvitations=await groupsinvitationServices.getAllGroupInvitations(req.params.id);
        res.json(groupallinvitations)
    } catch (err) {
        next(err);
    }
  };

const creategroupinvitation = async (req,res,next) => {
    try{
        const newgroupinvitation= await groupsinvitationServices.createGroupInvitation(req.params.id, req.body.userinvitedId)
        res.json(newgroupinvitation);
    } catch (err){
        next(err);
    }

};


const deletegroupinvitation = async (req, res, next) => {
    try {
        await groupsinvitationServices.deletegroupinvitation(req.params.id, req.params.userInvitedId);
        res.send("Group invitation deleted");
    } catch (err) {
        next(err);
    }
  };


export default {creategroupinvitation, deletegroupinvitation, getGroupAllInvitations}