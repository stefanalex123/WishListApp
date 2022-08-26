import express, { request } from "express";
import validationMiddleware from "../middleware/others_Middlewares/validationMiddleware.js";
import { check } from "express-validator";
import { jwtMiddleware } from "../middleware/others_Middlewares/auth.js";
import groupController from "../controllers/groups.js"
import Verify_if_Owner_Group from "../middleware/Group_Middlewares/Verify_if_Owner_Group.js" 
import groupinvitationController from "../controllers/groupsinvitations.js"
import wishlisttogroupController from "../controllers/wishlisttogroup.js"
import buyitemcontroller from "../controllers/buyitem.js"
import itemtowishlistController from "../controllers/itemtowishlist.js";

import Verify_If_Contribution_Invitation_To_Item_Is_Not_Sent from "../middleware/Contribution_Invitations_Middleware/Verify_If_Contribution_Invitation_To_Item_Is_Not_Sent.js"
import Verify_If_User_Send_Contribution_Invitaiton from "../middleware/Contribution_Invitations_Middleware/Verify_If_User_Send_Contribution_Invitaiton.js"
import Verify_If_UserBody_is_buyer_of_item from "../middleware/Contribution_Invitations_Middleware/Verify_If_UserBody_is_buyer_of_item.js"
import Verify_If_Contribution_Invitation_To_Item_Is_Sent from "../middleware/Contribution_Invitations_Middleware/Verify_If_Contribution_Invitation_To_Item_Is_Sent.js"


import Verify_If_Item_is_not_having_Principal_Buyer from "../middleware/BuyItem_Middlewares/Verify_If_Item_is_not_having_Principal_Buyer.js"
import Verify_If_Item_is_having_Principal_Buyer from "../middleware/BuyItem_Middlewares/Verify_If_Item_is_having_Principal_Buyer.js"

import Verify_If_Invitation_To_User_Body_Is_Not_Sent from "../middleware/Group_Invitations_Middleware/Verify_If_Invitation_To_User_Body_Is_Not_Sent.js"
import Verify_If_Invitation_To_User_Params_Is_Sent from "../middleware/Group_Invitations_Middleware/Verify_If_Invitation_To_User_Params_Is_Sent.js"
import Verify_If_User_Body_Exists from "../middleware/Group_Invitations_Middleware/Verify_If_User_Body_Exists.js"
import Verify_If_User_is_Owner_Of_Group from "../middleware/Group_Invitations_Middleware/Verify_If_User_is_Owner_Of_Group.js"

import Verify_if_User_Is_Owner_Of_WishList_Body from "../middleware/Wishlist_To_Group_Middlewares/Verify_if_User_Is_Owner_Of_WishList_Body.js"
import Verify_if_User_Is_Owner_Of_WishList_Params from "../middleware/Wishlist_To_Group_Middlewares/Verify_if_User_Is_Owner_Of_WishList_Params.js"
import Verify_If_User_Is_Member_Of_Group from "../middleware/Wishlist_To_Group_Middlewares/Verify_If_User_Is_Member_Of_Group.js"
import Verify_if_User_Is_Owner_Of_WishList_Body_And_Wishlist_Available from "../middleware/Wishlist_To_Group_Middlewares/Verify_if_User_Is_Owner_Of_WishList_Body_And_Wishlist_Available.js"
import Verify_If_Wishlist_Body_Is_Not_Shared_In_Group from "../middleware/Wishlist_To_Group_Middlewares/Verify_If_Wishlist_Body_Is_Not_Shared_In_Group.js"
import Verify_If_Wishlist_Params_Is_Shared_In_Group from "../middleware/Wishlist_To_Group_Middlewares/Verify_If_Wishlist_Params_Is_Shared_In_Group.js"



import Verify_If_Item_Params_Is_Shared_In_WishList from "../middleware/Item_To_Wishlist_Middlewares/Verify_If_Item_Params_Is_Shared_In_WishList.js"

import contributionInvitationsController from "../controllers/contributioninvitations.js"

const router = express.Router();


 //Groups

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
    .withMessage("GroupTitle need at least 4 characters")
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
    check("groupTitle")
    .optional().exists()
    .withMessage('is required')
    .optional().isLength({ min: 4})
    .withMessage("GroupTitile need at least 4 characters")
    .optional().matches(/^[a-zA-Z][\w\s-]+/)
    .withMessage("It has to start with a letter"),

    check("groupDescription")
    .optional().exists()
    .withMessage('is required')
    .optional().isLength({ min: 10})
    .withMessage("Wishlist description needs at least 10 characters")
    .optional().matches(/^[a-zA-Z][\w\s-]+/)
    .withMessage("It has to start with a letter")
    ],
    validationMiddleware,
    jwtMiddleware,
    Verify_if_Owner_Group,
    groupController.updateGroup)


    .delete([
    ], 
    validationMiddleware,
    jwtMiddleware,
    Verify_if_Owner_Group,
    groupController.deleteGroup)

 //Adding wishlists to groups

     router.route('/:id/wishlist') 
    .get([    
    ],
    validationMiddleware,
    jwtMiddleware, 
    Verify_If_User_Is_Member_Of_Group, //
    wishlisttogroupController.getGroupAllWishlists
    )  

    .post([ 
    ],
    validationMiddleware,
    jwtMiddleware,
    Verify_If_User_Is_Member_Of_Group, 
    Verify_if_User_Is_Owner_Of_WishList_Body_And_Wishlist_Available, 
    Verify_If_Wishlist_Body_Is_Not_Shared_In_Group,
    wishlisttogroupController.createWishlistToGroup
    ) 


    router.route('/:id/wishlist/:wishlistid')

    .delete([   
            ],
    validationMiddleware,
    jwtMiddleware,
    Verify_if_User_Is_Owner_Of_WishList_Params, 
    Verify_If_User_Is_Member_Of_Group, 
    Verify_If_Wishlist_Params_Is_Shared_In_Group,
    wishlisttogroupController.deleteWishlistToGroup
   )


    .put([    
    ],
    validationMiddleware,
    jwtMiddleware,
    Verify_If_User_Is_Member_Of_Group,
    Verify_If_Wishlist_Params_Is_Shared_In_Group, 
    Verify_if_User_Is_Owner_Of_WishList_Body_And_Wishlist_Available,
    Verify_If_Wishlist_Body_Is_Not_Shared_In_Group, 
    wishlisttogroupController.updateWishlistToGroup) 


//Sending invitations to user to groups

    router.route('/:id/invite')
    .post([ 
    ],
    validationMiddleware,
    jwtMiddleware,
    Verify_If_User_is_Owner_Of_Group,  
    Verify_If_User_Body_Exists,        
    Verify_If_Invitation_To_User_Body_Is_Not_Sent,  
    //-> + Verify_If_User_Invited_is_Already_In_Group 
    groupinvitationController.createGroupInvitation) 

    router.route('/:id/invite/:userinvitedid')
    .delete([   
    ],
    validationMiddleware,
    jwtMiddleware,
    Verify_If_User_is_Owner_Of_Group, 
    Verify_If_Invitation_To_User_Params_Is_Sent, 
    groupinvitationController.deleteGroupInvitation
    )


//Buy Items from wishlit from group

    router.route('/:id/wishlists/:wishlistid/items')
    .get([ 
    ],
    validationMiddleware,
    jwtMiddleware,
    Verify_If_User_Is_Member_Of_Group, 
    Verify_If_Wishlist_Params_Is_Shared_In_Group,
    itemtowishlistController.getWishListAllItems
    )

    router.route('/:id/wishlists/:wishlistid/items/:itemid/buyer') 
    .get([ 
    ],
    validationMiddleware,
    jwtMiddleware,
    Verify_If_User_Is_Member_Of_Group, 
    Verify_If_Wishlist_Params_Is_Shared_In_Group,
    Verify_If_Item_Params_Is_Shared_In_WishList,    
    buyitemcontroller.getAllBuyersForItem
    )

    router.route('/:id/wishlists/:wishlistid/items/:itemid/contributors') 
    .get([ 
    ],
    validationMiddleware,
    jwtMiddleware,
    Verify_If_User_Is_Member_Of_Group,
    Verify_If_Wishlist_Params_Is_Shared_In_Group, 
    Verify_If_Item_Params_Is_Shared_In_WishList,
    contributionInvitationsController.getAllContributorsForItem
    )

    router.route('/:id/wishlists/:wishlistid/items/:itemid/buy')
    .post([ 
    ],
    validationMiddleware,
    jwtMiddleware,
    Verify_If_User_Is_Member_Of_Group,  
    Verify_If_Item_Params_Is_Shared_In_WishList,     
    Verify_If_Wishlist_Params_Is_Shared_In_Group, 
    Verify_If_Item_is_not_having_Principal_Buyer, 
    buyitemcontroller.createBuyItem
    )


    //Send contribution invitations
    router.route('/:id/wishlists/:wishlistid/items/:itemid/contribute')
    .post([ 
    ],
    validationMiddleware,
    jwtMiddleware,
    Verify_If_User_Is_Member_Of_Group,   
    Verify_If_Item_Params_Is_Shared_In_WishList,        
    Verify_If_Wishlist_Params_Is_Shared_In_Group, 
    Verify_If_UserBody_is_buyer_of_item, 
    Verify_If_Contribution_Invitation_To_Item_Is_Not_Sent,
    contributionInvitationsController.createContributionInvitation
    )

    .delete([   
    ],
    validationMiddleware,
    jwtMiddleware,
    Verify_If_User_Send_Contribution_Invitaiton, 
    Verify_If_Contribution_Invitation_To_Item_Is_Sent, 
    contributionInvitationsController.deteleContributionInvitation
    )


                                                             


















export default router;