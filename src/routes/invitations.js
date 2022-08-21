




router.route('/')
get([    
],
validationMiddleware,
jwtMiddleware,
itemtowishlistController.getWishlistAllItems)  


router.route('/:invitationId/status')
.put([ 
],
validationMiddleware,
jwtMiddleware,
Verify_If_Invitation_To_User_Auth_Is_Sent,
itemtowishlistController.createItemtoWishlist) 