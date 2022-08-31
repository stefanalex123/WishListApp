import express, { request } from "express";
import validationMiddleware from "../middleware/others_Middlewares/validationMiddleware.js";
import { check } from "express-validator";
import { jwtMiddleware } from "../middleware/others_Middlewares/auth.js";
import groupController from "../controllers/groups.js"
//import Verify_if_Owner_Group from "../middleware/Group_Middlewares/Verify_if_Owner_Group.js" 
import groupinvitationController from "../controllers/groupsinvitations.js"
import referralsinvitationsController from "../controllers/referralsinvitations.js"
import wishlisttogroupController from "../controllers/wishlisttogroup.js"
import buyitemcontroller from "../controllers/buyitem.js"
import itemtowishlistController from "../controllers/itemtowishlist.js";

import itemNotPrincipalBuyerMiddleware from "../middleware/BuyItem_Middlewares/itemNotPrincipalBuyerMiddleware.js";
import contributionItemSentMiddleware from "../middleware/Contribution_Invitations_Middleware/contributionItemSentMiddleware.js";
import userBodyBuyerItemMiddleware from "../middleware/Contribution_Invitations_Middleware/userBodyBuyerItemMiddleware.js";
import userSendContributionMiddleware from "../middleware/Contribution_Invitations_Middleware/userSendContributionMiddleware.js";
import contributionItemNotSentMiddleware from "../middleware/Contribution_Invitations_Middleware/contributionItemNotSentMiddleware.js";
import itemPrincipalBuyerMiddleware from "../middleware/BuyItem_Middlewares/itemPrincipalBuyerMiddleware.js";
import invitationUserBodyNotSentMiddleware from "../middleware/Group_Invitations_Middleware/invitationUserBodyNotSentMiddleware.js";
import invitationUserParamsSentMiddleware from "../middleware/Group_Invitations_Middleware/invitationUserParamsSentMiddleware.js";
import userBodyExistsMiddleware from "../middleware/Group_Invitations_Middleware/userBodyExistsMiddleware.js";
import userOwnerGroup from "../middleware/Group_Invitations_Middleware/userOwnerGroup.js";
import userOwnerWishlistBodyMiddleware from "../middleware/Wishlist_To_Group_Middlewares/userOwnerWishlistBodyMiddleware.js";
import userOwnerWishlistParamsMiddleware from "../middleware/Wishlist_To_Group_Middlewares/userOwnerWishlistParamsMiddleware.js";
import userMemberGroupMiddleware from "../middleware/Wishlist_To_Group_Middlewares/userMemberGroupMiddleware.js";
import userOwnerWishlistAndAvailableMiddleware from "../middleware/Wishlist_To_Group_Middlewares/userOwnerWishlistAndAvailableMiddleware.js";
import wishlistBodyNotSharedGroupMiddleware from "../middleware/Wishlist_To_Group_Middlewares/wishlistBodyNotSharedGroupMiddleware.js";
import wishlistParamsSharedGroupMiddleware from "../middleware/Wishlist_To_Group_Middlewares/wishlistParamsSharedGroupMiddleware.js";
import itemParamsSharedWishlistMiddleware from "../middleware/Item_To_Wishlist_Middlewares/itemParamsSharedWishlistMiddleware.js";
import referralLinkNotSendMiddleware from "../middleware/Referral_Middlewares/referralLinkNotSendMiddleware.js";

import contributionInvitationsController from "../controllers/contributioninvitations.js"
import owenerGroupMiddleware from "../middleware/Group_Middlewares/owenerGroupMiddleware.js";

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
    owenerGroupMiddleware, //Verify if owner group
    groupController.updateGroup)


    .delete([
    ], 
    validationMiddleware,
    jwtMiddleware,
    owenerGroupMiddleware, //Verify if Owner Group,
    groupController.deleteGroup)

 //Adding wishlists to groups

     router.route('/:id/wishlist') 
    .get([    
    ],
    validationMiddleware,
    jwtMiddleware, 
    owenerGroupMiddleware, // Verify if Owner Group
    wishlisttogroupController.getGroupAllWishlists
    )  

    .post([ 
    check("wishlistId")
    .exists()
    .withMessage('is required')
    ],
    validationMiddleware,
    jwtMiddleware,
    owenerGroupMiddleware,                    //Verify_If_User_Is_Member_Of_Group, 
    userOwnerWishlistAndAvailableMiddleware, //Verify_if_User_Is_Owner_Of_WishList_Body_And_Wishlist_Available, 
    wishlistBodyNotSharedGroupMiddleware,    //Verify_If_Wishlist_Body_Is_Not_Shared_In_Group,
    wishlisttogroupController.createWishlistToGroup
    ) 


    router.route('/:id/wishlist/:wishlistid')

    .delete([   
    check("wishlistId")
    .exists()
    .withMessage('is required')
            ],
    validationMiddleware,
    jwtMiddleware,
    userOwnerWishlistParamsMiddleware,         //Verify_if_User_Is_Owner_Of_WishList_Params, 
    userMemberGroupMiddleware,                //Verify_If_User_Is_Member_Of_Group, 
    wishlistParamsSharedGroupMiddleware,      //Verify_If_Wishlist_Params_Is_Shared_In_Group,
    wishlisttogroupController.deleteWishlistToGroup
   )


    .put([ 
    check("wishlistId")
    .exists()
    .withMessage('is required')   
    ],
    validationMiddleware,
    jwtMiddleware,
    userMemberGroupMiddleware,                  //Verify_If_User_Is_Member_Of_Group,
    wishlistParamsSharedGroupMiddleware,        //Verify_If_Wishlist_Params_Is_Shared_In_Group, 
    userOwnerWishlistAndAvailableMiddleware,    //Verify_if_User_Is_Owner_Of_WishList_Body_And_Wishlist_Available,
    wishlistBodyNotSharedGroupMiddleware,       //Verify_If_Wishlist_Body_Is_Not_Shared_In_Group, 
    wishlisttogroupController.updateWishlistToGroup) 


//Sending invitations to user to groups



    router.route('/:id/invite')
    .post([ 
     check("userInvitedId")
    .exists()
    .withMessage('is required')
    ],
    validationMiddleware,
    jwtMiddleware,
    userOwnerGroup,               //Verify_If_User_is_Owner_Of_Group,  
    userBodyExistsMiddleware,               //Verify_If_User_Body_Exists,        
    invitationUserBodyNotSentMiddleware,    //Verify_If_Invitation_To_User_Body_Is_Not_Sent,  
   
    groupinvitationController.createGroupInvitation) 

    router.route('/:id/referral')
    .post([ 
        check("email")
       .exists()
       .withMessage('is required')
       ],
       validationMiddleware,
       jwtMiddleware,
       userOwnerGroup,                  //Verify_If_User_is_Owner_Of_Group, 
       referralLinkNotSendMiddleware,   //Verify_If_Refferal_Invitation_is_Not_Send         
        referralsinvitationsController.createReferralInvitation) 

    router.route('/:id/invite/:userinvitedid')
    .delete([   
    ],
    validationMiddleware,
    jwtMiddleware,
     userOwnerGroup,                    //Verify_If_User_is_Owner_Of_Group, 
     invitationUserParamsSentMiddleware,//Verify_If_Invitation_To_User_Params_Is_Sent, 
    groupinvitationController.deleteGroupInvitation
    )


//Buy Items from wishlit from group

    router.route('/:id/wishlists/:wishlistid/items')
    .get([ 
    ],
    validationMiddleware,
    jwtMiddleware,
    userMemberGroupMiddleware,          //Verify_If_User_Is_Member_Of_Group, 
    wishlistParamsSharedGroupMiddleware,//Verify_If_Wishlist_Params_Is_Shared_In_Group,
    itemtowishlistController.getWishlistAllItems
    )

    router.route('/:id/wishlists/:wishlistid/items/:itemid/buyer') 
    .get([ 
    ],
    validationMiddleware,
    jwtMiddleware,
    userMemberGroupMiddleware,              //Verify_If_User_Is_Member_Of_Group, 
    wishlistParamsSharedGroupMiddleware,    //Verify_If_Wishlist_Params_Is_Shared_In_Group,
    itemParamsSharedWishlistMiddleware,     //Verify_If_Item_Params_Is_Shared_In_WishList,    
    buyitemcontroller.getAllBuyersForItem
    )

    router.route('/:id/wishlists/:wishlistid/items/:itemid/contributors') 
    .get([ 
    ],
    validationMiddleware,
    jwtMiddleware,
     userMemberGroupMiddleware,               //Verify_If_User_Is_Member_Of_Group,
     wishlistParamsSharedGroupMiddleware,     //Verify_If_Wishlist_Params_Is_Shared_In_Group, 
     itemParamsSharedWishlistMiddleware,      //Verify_If_Item_Params_Is_Shared_In_WishList,
    contributionInvitationsController.getAllContributorsForItem
    )

    router.route('/:id/wishlists/:wishlistid/items/:itemid/buy')
    .post([ 
    ],
    validationMiddleware,
    jwtMiddleware,
    userMemberGroupMiddleware,                 //Verify_If_User_Is_Member_Of_Group,  
    itemParamsSharedWishlistMiddleware,       //Verify_If_Item_Params_Is_Shared_In_WishList,     
    wishlistParamsSharedGroupMiddleware,     //Verify_If_Wishlist_Params_Is_Shared_In_Group, 
    itemNotPrincipalBuyerMiddleware,        //Verify_If_Item_is_not_having_Principal_Buyer, 
    buyitemcontroller.createBuyItem
    )


    //Send contribution invitations
    router.route('/:id/wishlists/:wishlistid/items/:itemid/contribute')
    .post([ 
    check("userId")
    .exists()
    .withMessage('is required')
    ],
    validationMiddleware,
    jwtMiddleware,
    userMemberGroupMiddleware,                       //Verify_If_User_Is_Member_Of_Group,   
    itemParamsSharedWishlistMiddleware,               //Verify_If_Item_Params_Is_Shared_In_WishList,        
    wishlistParamsSharedGroupMiddleware,               //Verify_If_Wishlist_Params_Is_Shared_In_Group, 
    userBodyBuyerItemMiddleware,                        //Verify_If_UserBody_is_buyer_of_item, 
    contributionItemNotSentMiddleware,                  //Verify_If_Contribution_Invitation_To_Item_Is_Not_Sent,
    contributionInvitationsController.createContributionInvitation
    )

    .delete([   
    ],
    validationMiddleware,
    jwtMiddleware,
    userSendContributionMiddleware,    //Verify_If_User_Send_Contribution_Invitaiton, 
    contributionItemSentMiddleware,    //Verify_If_Contribution_Invitation_To_Item_Is_Sent, 
    contributionInvitationsController.deteleContributionInvitation
    )


                                                             


















export default router;