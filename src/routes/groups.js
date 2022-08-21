import express, { request } from "express";
import validationMiddleware from "../middleware/others_Middlewares/validationMiddleware.js";
import { check } from "express-validator";
import { jwtMiddleware } from "../middleware/others_Middlewares/auth.js";
import groupController from "../controllers/groups.js"
import Verify_if_Owner_Group from "../middleware/Group_Middlewares/Verify_if_Owner_Group.js" 
import groupinvitationController from "../controllers/groupsinvitations.js"
import wishlisttogroupController from "../controllers/wishlisttogroup.js"

//////group invitations imports
import Verify_If_Invitation_To_User_Body_Is_Not_Sent from "../middleware/Group_Invitations_Middleware/Verify_If_Invitation_To_User_Body_Is_Not_Sent.js"
import Verify_If_Invitation_To_User_Params_Is_Sent from "../middleware/Group_Invitations_Middleware/Verify_If_Invitation_To_User_Params_Is_Sent.js"
import Verify_If_User_Body_Exists from "../middleware/Group_Invitations_Middleware/Verify_If_User_Body_Exists.js"
import Verify_If_User_is_Owner_Of_Group from "../middleware/Group_Invitations_Middleware/Verify_If_User_is_Owner_Of_Group.js"


/////wishlist to group imports

import Verify_If_User_Is_Member_Of_Group from "../middleware/Wishlist_To_Group_Middlewares/Verify_If_User_Is_Member_Of_Group.js"
import Verify_if_User_Is_Owner_Of_WishList_Body from "../middleware/Wishlist_To_Group_Middlewares/Verify_if_User_Is_Owner_Of_WishList_Body.js"
import Verify_If_Wishlist_Body_Is_Not_Shared_In_Group from "../middleware/Wishlist_To_Group_Middlewares/Verify_If_Wishlist_Body_Is_Not_Shared_In_Group.js"
import Verify_If_Wishlist_Params_Is_Shared_In_Group from "../middleware/Wishlist_To_Group_Middlewares/Verify_If_Wishlist_Params_Is_Shared_In_Group.js"




const router = express.Router();

///////////////////////////////////////GROUPS//////////////////////////////////////////////////////

router.route('/owner')
.get([    


],
    validationMiddleware,
    jwtMiddleware,
    groupController.getAllGroupsWhereOwner)  


router.route('/')
    .post([
        check("groupTitle")
        .exists()
        .withMessage('is required')
        .isLength({ min: 4})
        .withMessage("GroupTtile need at least 4 characters")
        .matches(/^[a-zA-Z][\w\s-]+/)
        .withMessage("It has to start with a letter"),

       check("groupDescription")
       .exists()
       .withMessage('is required')
    ],
    validationMiddleware,
    jwtMiddleware,
    groupController.createGroup) 


    router.route('/:id')
    .put([

        check("grouptitle")
        .optional().exists()
        .withMessage('is required')
        .optional().isLength({ min: 4})
        .withMessage("GroupTtile need at least 4 characters")
        .optional().matches(/^[a-zA-Z][\w\s-]+/)
        .withMessage("It has to start with a letter"),

        check("groupdescription")
        .optional().exists()
        .withMessage('is required')
        .optional().isLength({ min: 10})
        .withMessage("Wishlist description needs at least 10 characters")
        .optional().matches(/^[a-zA-Z][\w\s-]+/)
        .withMessage("It has to start with a letter")


    ], validationMiddleware,
        jwtMiddleware,
        Verify_if_Owner_Group,
        groupController.updateGroup)

    .delete([
    ], validationMiddleware,
     jwtMiddleware,
     Verify_if_Owner_Group,
     groupController.deleteGroup)

///////////////////////////////////////ADDING WIHSLIT TO GROUPS///////////////////////////////////////////////


     router.route('/:id/wishlist')
        .get([    
            ],
         validationMiddleware,
        jwtMiddleware, 
        Verify_If_User_Is_Member_Of_Group,
        wishlisttogroupController.getgroupallwishlists
        )  

        .post([ 
        ],
    validationMiddleware,
    jwtMiddleware,
    Verify_If_User_Is_Member_Of_Group,
    Verify_if_User_Is_Owner_Of_WishList_Body,
    Verify_If_Wishlist_Body_Is_Not_Shared_In_Group,
    wishlisttogroupController.createwishlisttogroup
    ) 

    router.route('/:id/wishlists/:wishlistid')
    .delete([   
            ],
    validationMiddleware,
    jwtMiddleware,
    Verify_If_User_Is_Member_Of_Group,
    Verify_If_Wishlist_Params_Is_Shared_In_Group,
    wishlisttogroupController.deletewishlistrogroup
   )


    .put([    
    ],
    validationMiddleware,
    jwtMiddleware,
    Verify_If_User_Is_Member_Of_Group,
    Verify_If_Wishlist_Params_Is_Shared_In_Group,
    Verify_if_User_Is_Owner_Of_WishList_Body,
    Verify_If_Wishlist_Body_Is_Not_Shared_In_Group,
    wishlisttogroupController.updatewishlisttogroup) 


///////////////////////////////SENDING INVITATION TO USERS TO GRUOUPS///////////////////////////////////////////
router.route('/:id/invitations')

.get([    
    ],
validationMiddleware,
jwtMiddleware,
Verify_If_User_is_Owner_Of_Group,
groupinvitationController.getGroupAllInvitations)  

.post([ 
],
validationMiddleware,
jwtMiddleware,
Verify_If_User_is_Owner_Of_Group,
Verify_If_User_Body_Exists,
Verify_If_Invitation_To_User_Body_Is_Not_Sent,
groupinvitationController.creategroupinvitation) 

router.route('/:id/invitations/:userinvitedId')
.delete([   
],
validationMiddleware,
jwtMiddleware,
Verify_If_User_is_Owner_Of_Group,
Verify_If_Invitation_To_User_Params_Is_Sent,
groupinvitationController.deletegroupinvitation
)




















export default router;