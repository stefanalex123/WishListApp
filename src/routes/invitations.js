import express, { request } from "express";
import validationMiddleware from "../middleware/others_Middlewares/validationMiddleware.js";
import { check } from "express-validator";
import { jwtMiddleware } from "../middleware/others_Middlewares/auth.js";
import groupController from "../controllers/groups.js"
import owenerGroupMiddleware from "../middleware/Group_Middlewares/owenerGroupMiddleware.js";
import invitationUserSentMiddleware from "../middleware/Group_Invitations_Middleware/invitationUserSentMiddleware.js";
import invitationContributionUserSentMiddleware from "../middleware/Contribution_Invitations_Middleware/invitationContributionUserSentMiddleware.js"



import groupinvitationController from "../controllers/groupsinvitations.js"
import wishlisttogroupController from "../controllers/wishlisttogroup.js"
import statusMiddleware from "../middleware/Group_Invitations_Middleware/statusMiddleware.js";
import contributionInvitationController from "../controllers/contributioninvitations.js"
const router = express.Router();



router.route('/groupinvitations') 
.get([    
],
validationMiddleware,
jwtMiddleware,
groupinvitationController.getAllInvitationsForUser)   


router.route('/groupinvitations/:invitationId/status')
.put([ 
],
statusMiddleware,
validationMiddleware,
jwtMiddleware,
invitationUserSentMiddleware, //Verify if the invitation is sent to the user,  
groupinvitationController.updateGroupInvitation)


router.route('/contributioninvitations')  
.get([    
],
validationMiddleware,
jwtMiddleware,
contributionInvitationController.getAllContributionInvitationForUserAsked
)   


router.route('/contributioninvitations/:invitationId/status')
.put([ 
],
statusMiddleware,
validationMiddleware,
jwtMiddleware,
invitationContributionUserSentMiddleware,  //Verify_If_InvitationContr_To_User_Auth_Is_Sent, 
contributionInvitationController.updateContributionInvitation,
) 






export default router;