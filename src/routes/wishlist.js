import express, { request } from "express";
import validationMiddleware from "../middleware/others_Middlewares/validationMiddleware.js";
import { check } from "express-validator";
import { jwtMiddleware } from "../middleware/others_Middlewares/auth.js";
import wishlistController from "../controllers/wishlist.js"

import itemBodyNotSharedWishlistMiddleware from "../middleware/Item_To_Wishlist_Middlewares/itemBodyNotSharedWishlistMiddleware.js";
import itemParamsSharedWishlistMiddleware from "../middleware/Item_To_Wishlist_Middlewares/itemParamsSharedWishlistMiddleware.js";
import userOwnerItemBodyMiddleware from "../middleware/Item_To_Wishlist_Middlewares/userOwnerItemBodyMiddleware.js";
import userOwnerWishlistMiddleware from "../middleware/Item_To_Wishlist_Middlewares/userOwnerWishlistMiddleware.js";
import wishlistExistsMiddleware from "../middleware/Wishlists_Middlewares/wishlistExistsMiddleware.js";

import itemtowishlistController from "../controllers/itemtowishlist.js"
const router = express.Router();


router.route('/')

.get([
           
], 
validationMiddleware,
jwtMiddleware,
wishlistController.getAllWishlistPagination


)  

.get([    
],
 validationMiddleware,
 jwtMiddleware, 
 wishlistController.getAllWishlists)  




.post([
        check("wishlistName")
        .exists()
        .withMessage('is required')
        .isLength({ min: 4})
        .withMessage("Wishlist Name need at least 4 characters")
        .matches(/^[a-zA-Z][\w\s-]+/)
        .withMessage("It has to start with a letter"),

        check("wishlistDescription")
        .exists()
        .withMessage('is required')
        .isLength({ min: 10})
        .withMessage("Wishlist description needs at least 10 characters")
        .matches(/^[a-zA-Z][\w\s-]+/)
        .withMessage("It has to start with a letter")
    ],
    validationMiddleware,
    jwtMiddleware,
    wishlistController.createWishlist) 



    router.route('/:id')
    .put([
        check("wishlistName")
        .optional().exists()
        .withMessage('is required')
        .optional().isLength({ min: 4})
        .withMessage("Wishlist Name need at least 4 characters")
        .optional().matches(/^[a-zA-Z][\w\s-]+/)
        .withMessage("It has to start with a letter"),

        check("wishlistDescription")
        .optional().exists()
        .withMessage('is required')
        .optional().isLength({ min: 10})
        .withMessage("Wishlist description needs at least 10 characters")
        .optional().matches(/^[a-zA-Z][\w\s-]+/)
        .withMessage("It has to start with a letter")


    ],
    validationMiddleware,
    jwtMiddleware,
    wishlistExistsMiddleware,  //Verify if user is owner of wishlist and if wishlist exists
    wishlistController.updateWishlist)

    .delete([
    ],
    validationMiddleware,
    jwtMiddleware,
    wishlistExistsMiddleware,   //Verify if user is owner of wishlist and if wishlist exists
    wishlistController.deleteWishlist)


                                            //ADDING ITEMS TO WISHLIST

    router.route('/:id/items')
    .get([    
    ],
     validationMiddleware,
     jwtMiddleware, 
     userOwnerWishlistMiddleware,   //Verify if user is owner of wishlist and if wishlist exists
     itemtowishlistController.getWishlistAllItems)  

    .post([ 
        check("itemId")
        .exists()
        .withMessage('is required')
    ],
    validationMiddleware,
    jwtMiddleware,
    userOwnerWishlistMiddleware,//Verify if user is owner of wishlist and if wishlist exists  
    userOwnerItemBodyMiddleware,//Verify if user is owner of the item he wants to add and if item exists,     
    itemBodyNotSharedWishlistMiddleware,//Verify if the item the user wants to add is not shared already in the wishlists 
    itemtowishlistController.createItemToWishlist)   


    router.route('/:id/items/:itemId')
    .delete([   
    ],
    validationMiddleware,
    jwtMiddleware,
    userOwnerWishlistMiddleware,        //Verify if user is owner of wishlist and if wishlist exists  
    itemParamsSharedWishlistMiddleware, //Verify if the item the user wants to delete is shared in wishlist
    itemtowishlistController.deleteItemFromWishlist) 
    
    .put([  
        check("itemId")
        .exists()
        .withMessage('is required')  
    ],
    validationMiddleware,
    jwtMiddleware,
     userOwnerWishlistMiddleware,          //Verify if user is owner of wishlist and if wishlist exists   
     itemParamsSharedWishlistMiddleware,   //Verify if the item the user wants to modify is shared in wishlist
    userOwnerItemBodyMiddleware,            //Verify if user is owner of the item he wants to add, 
    itemBodyNotSharedWishlistMiddleware,    //Verify if the item the user wants to add is not already in the wishlist 
    itemtowishlistController.updateItemToWishlist) 


















export default router;