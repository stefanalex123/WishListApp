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
import userprofileController from "../controllers/userprofile.js"

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
import itemtowishlistController from "../controllers/itemtowishlist.js"
import contributionInvitationsController from "../controllers/contributioninvitations.js"
import owenerGroupMiddleware from "../middleware/Group_Middlewares/owenerGroupMiddleware.js";

const router = express.Router();



    router.route('/owner')
    .get([    
    ],
    validationMiddleware,
    jwtMiddleware,
    groupController.getAllGroupsWhereOwner) // get al the groups where user is the owner

    router.route('/member')
    .get([    
    ],
    validationMiddleware,
    jwtMiddleware,
    groupinvitationController.getAllInvitationsAcceptedForUser)


    router.route('/:id/mostPopularBuyer') // de testat
    .get([    
    ],
    validationMiddleware,
    jwtMiddleware,
    userMemberGroupMiddleware, // Verify If User is member of the group
    groupController.mostPopularBuyer)// get al the groups where user is member


    router.route('/:id/mostPopularContributer') // de testat
    .get([    
    ],
    validationMiddleware,
    jwtMiddleware,
    userMemberGroupMiddleware, // Verify If User is member of the group
    groupController.mostPopularContributer)// get al the groups where user is member


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
    owenerGroupMiddleware, //Verify if the user is the owner of the group
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
    userMemberGroupMiddleware, // Verify If User is member of the group
    wishlisttogroupController.getGroupAllWishlists
    )  

    .post([ 
    check("wishlistId")
    .exists()
    .withMessage('is required')
    ],
    validationMiddleware,
    jwtMiddleware,
    userMemberGroupMiddleware,               //Verify_If_User_Is_Member_Of_Group, 
    userOwnerWishlistAndAvailableMiddleware, //Verify if the user is the owner of the wishlist and if the wishlist has at least one item in it, 
    wishlistBodyNotSharedGroupMiddleware,    //Verify If wishlist is not already shared in the group,
    wishlisttogroupController.createWishlistToGroup
    ) 






    router.route('/:id/wishlists/:wishlistId')

    .delete([   
    check("wishlistId")
    .exists()
    .withMessage('is required')
            ],
    validationMiddleware,
    jwtMiddleware,
    userOwnerWishlistParamsMiddleware,         //Verify if User Is Owner Of WishList Params, 
    userMemberGroupMiddleware,                //Verify If User Is Member Of_Group, 
    wishlistParamsSharedGroupMiddleware,      //Verify If Wishlist Is Shared In Group,
    wishlisttogroupController.deleteWishlistToGroup
   )


    .put([ 
    check("wishlistId")
    .exists()
    .withMessage('is required')   
    ],
    validationMiddleware,
    jwtMiddleware,
    userMemberGroupMiddleware,                  //Verify If user Is Member Of Group,
    wishlistParamsSharedGroupMiddleware,        //Verify If Wishlist Params Is Shared In Group, 
    userOwnerWishlistAndAvailableMiddleware,    //Verify if User Is Owner Of WishList Body And Wishlist has at least one item,
    wishlistBodyNotSharedGroupMiddleware,       //Verify If Wishlist User Want To Add Is Not Shared In Group, 
    wishlisttogroupController.updateWishlistToGroup) 


//Sending invitations to user to groups

    router.route('/:id/invite/allUsers')
.   get([
    ],
    validationMiddleware,
    jwtMiddleware,
    userprofileController.getAllProfiles) 

    router.route('/:id/invite')
    .post([ 
     check("userInvitedId")
    .exists()
    .withMessage('is required')
    ],
    validationMiddleware,
    jwtMiddleware,
    owenerGroupMiddleware,              //Verify if user is the owner of the group,  
    userBodyExistsMiddleware,           //Verify if the user invited has the profile complited,        
    invitationUserBodyNotSentMiddleware,//Verify If the user invited is not already a member of the group or if the invitation is not already sent  
   
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

        router.route('/:id/referral/gmail')
        .post([ 
            check("email")
           .exists()
           .withMessage('is required')
           ],
           validationMiddleware,
           jwtMiddleware,
           userOwnerGroup,                  //Verify_If_User_is_Owner_Of_Group, 
           referralLinkNotSendMiddleware,   //Verify_If_Refferal_Invitation_is_Not_Send         
            referralsinvitationsController.createReferralInvitationGmail) 

    router.route('/:id/invite/:userinvitedid')
    .delete([   
    ],
    validationMiddleware,
    jwtMiddleware,
    owenerGroupMiddleware,              //Verify If User is Owner of Group, 
    invitationUserParamsSentMiddleware, //Verify If the invitation that the owner try to delete exists, 
    groupinvitationController.deleteGroupInvitation
    )


//Buy Items from wishlit from group

    router.route('/:id/wishlists/:wishlistId/items')
    .get([ 
    ],
    validationMiddleware,
    jwtMiddleware,
    userMemberGroupMiddleware,          //Verify If User Is Member Of Group, 
    wishlistParamsSharedGroupMiddleware,//Verify If Wishlist Params Is Shared In Group,
    itemtowishlistController.getWishlistAllItems
    )

    router.route('/:id/wishlists/:wishlistId/items/:itemId/buyer') 
    .get([ 
    ],
    validationMiddleware,
    jwtMiddleware,
    userMemberGroupMiddleware,              //Verify If User Is Member Of Group, 
    wishlistParamsSharedGroupMiddleware,    //Verify If Wishlist_Is_Shared_In_Group,
    itemParamsSharedWishlistMiddleware,     //Verify If Item Is Shared In WishList,    
    buyitemcontroller.getAllBuyersForItem
    )

    router.route('/:id/wishlists/:wishlistId/items/:itemId/contributors') 
    .get([ 
    ],
    validationMiddleware,
    jwtMiddleware,
     userMemberGroupMiddleware,               //Verify If User Is Member Of Group,
     wishlistParamsSharedGroupMiddleware,     //Verify If Wishlist Params Is Shared In Group, 
     itemParamsSharedWishlistMiddleware,      //Verify If Item Params Is Shared In WishList,
    contributionInvitationsController.getAllContributorsForItem
    )

    router.route('/:id/wishlists/:wishlistId/items/:itemId/buy')
    .post([ 
    ],
    validationMiddleware,
    jwtMiddleware,
    userMemberGroupMiddleware,               //Verify If User Is Member Of Group,  
    itemParamsSharedWishlistMiddleware,     //Verify If Item Params Is Shared In WishList,     
    wishlistParamsSharedGroupMiddleware,   //Verify If Wishlist Params Is Shared In Group, 
    itemNotPrincipalBuyerMiddleware,      //Verify If Item is not having Principal Buyer, 
    buyitemcontroller.createBuyItem
    )


    //Send contribution invitations
    router.route('/:id/wishlists/:wishlistId/items/:itemId/contribute')
    .post([ 
    check("userId")
    .exists()
    .withMessage('is required')
    ],
    validationMiddleware,
    jwtMiddleware,
    userMemberGroupMiddleware,           //Verify If User Is Member Of Group,   
    itemParamsSharedWishlistMiddleware,   //Verify If Item Params Is Shared In WishList,        
    wishlistParamsSharedGroupMiddleware,  //Verify If Wishlist Params Is Shared In Group, 
    userBodyBuyerItemMiddleware,         //Verify If UserBody is buyer of item, 
    contributionItemNotSentMiddleware,    //Verify If Contribution Invitation To Item Is Not Sent,
    contributionInvitationsController.createContributionInvitation
    )

  


                                                             


















export default router;