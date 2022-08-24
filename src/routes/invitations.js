import express, { request } from "express";
import validationMiddleware from "../middleware/others_Middlewares/validationMiddleware.js";
import { check } from "express-validator";
import { jwtMiddleware } from "../middleware/others_Middlewares/auth.js";
import groupController from "../controllers/groups.js"
import Verify_if_Owner_Group from "../middleware/Group_Middlewares/Verify_if_Owner_Group.js" 
import groupinvitationController from "../controllers/groupsinvitations.js"
import wishlisttogroupController from "../controllers/wishlisttogroup.js"
import Verify_If_Invitation_To_User_Auth_Is_Sent from "../middleware/Group_Invitations_Middleware/Verify_If_Invitation_To_User_Auth_Is_Sent.js"
import statusMiddleware from "../middleware/Group_Invitations_Middleware/statusMiddleware.js";
import Verify_If_InvitationContr_To_User_Auth_Is_Sent from "../middleware/Contribution_Invitations_Middleware/Verify_If_InvitationContr_To_User_Auth_Is_Sent.js"
import contributionInvitationController from "../controllers/contributioninvitations.js"
const router = express.Router();



router.route('/groupinvitations') 
.get([    
],
validationMiddleware,
jwtMiddleware,
groupinvitationController.getallinvitationsforuser)   


router.route('/groupinvitations/:invitationid/status')
.put([ 
],
statusMiddleware,
validationMiddleware,
jwtMiddleware,
Verify_If_Invitation_To_User_Auth_Is_Sent,  
groupinvitationController.updategroupinvitation)


router.route('/contributioninvitations')  
.get([    
],
validationMiddleware,
jwtMiddleware,
contributionInvitationController.getallcontributioninvitationforuserasked
)   


router.route('/contributioninvitations/:invitationid/status')
.put([ 
],
statusMiddleware,
validationMiddleware,
jwtMiddleware,
Verify_If_InvitationContr_To_User_Auth_Is_Sent, 
contributionInvitationController.updatecontributioninvitation,
) 






export default router;