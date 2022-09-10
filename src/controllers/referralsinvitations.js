import refferalInvitationsService from "../services/referralsinvitations.js"
import sendmail from "../../sendmail.js"
import groupsInvitationsServices from "../services/groupsinvitations.js"


const createReferralInvitation= async(req,res,next) =>{
    try{
      const newRefferalInvitation= await refferalInvitationsService.createReferralInvitation(
        req.auth.userId, req.params.id, req.body.email, "AVAILABLE"
      )
      res.json(newRefferalInvitation);

      //trimitem mail
      sendmail(
      "GROUP INVITATION", "http://localhost:3000/referral/" + newRefferalInvitation.id, req.body.email)
      const ghostGroupInvitation= await groupsInvitationsServices.createGroupInvitation(req.params.id, '1')
  } catch (err){
      next(err);
  }
  
  };

  const createReferralInvitationGmail= async(req,res,next) =>{
    try{
      const newRefferalInvitation= await refferalInvitationsService.createReferralInvitation(
        req.auth.userId, req.params.id, req.body.email, "AVAILABLE"
      )
      res.json(newRefferalInvitation);

      //trimitem mail
      sendmail(
      "GROUP INVITATION", "http://localhost:3000/referral/" + newRefferalInvitation.id +"/auth/google", req.body.email
      )
  } catch (err){
      next(err);
  }
  
  };



  export default {createReferralInvitation, createReferralInvitationGmail}