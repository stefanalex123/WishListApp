import refferalInvitationsService from "../services/referralsinvitations.js"
import sendmail from "../../sendmail.js"



const createReferralInvitation= async(req,res,next) =>{
    try{
      const newRefferalInvitation= await refferalInvitationsService.createReferralInvitation(
        req.auth.userId, req.params.id, req.body.email, "AVAILABLE"
      )
      res.json(newRefferalInvitation);

      //trimitem mail
      sendmail(
      "GROUP INVITATION", "http://localhost:3000/referral/"
       + newRefferalInvitation.userDeliverId
       +"/groups/" + newRefferalInvitation.groupId +"/email/"+newRefferalInvitation.emailSend, req.body.email)
  } catch (err){
      next(err);
  }
  
  };



  export default {createReferralInvitation}