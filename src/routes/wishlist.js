import express, { request } from "express";
import validationMiddleware from "../middleware/others_Middlewares/validationMiddleware.js";
import { check } from "express-validator";
import { jwtMiddleware } from "../middleware/others_Middlewares/auth.js";
import wishlistController from "../controllers/wishlist.js"
//import Verify_If_Item_Body_Exists_In_ItemsDB from "../middleware/Item_To_Wishlist_Middlewares/Verify_If_Item_Body_Exists_In_ItemsDB"
//import Verify_If_Item_Body_Exists_In_ItemsDB from "../middleware/Item_To_Wishlist_Middlewares/Verify_If_Item_Body_Exists_In_ItemsDB.js"
import Verify_If_Item_Body_Exists_In_ItemsDB from "../middleware/Item_To_Wishlist_Middlewares/Verify_If_Item_Body_Exists_In_ItemsDB.js"
import Verify_if_Item_Body_Exists_In_ItemToWhislistsDB from "../middleware/Item_To_Wishlist_Middlewares/Verify_if_Item_Body_Exists_In_ItemToWhislistsDB.js"
import Verify_if_Item_Params_Exists_In_ItemsDB from "..//middleware/Item_To_Wishlist_Middlewares/Verify_if_Item_Params_Exists_In_ItemsDB.js"
import Verify_if_Item_Params_Exists_In_ItemToWhislistsDB from "..//middleware/Item_To_Wishlist_Middlewares/Verify_if_Item_Params_Exists_In_ItemToWhislistsDB.js"
import Verify_If_WishList_Exists_In_WhisListsDB from "..//middleware/Item_To_Wishlist_Middlewares//Verify_If_WishList_Exists_In_WhisListsDB.js"
import Verify_If_Wishlist_Exists_in_WishlistsDB from "../middleware/Wishlists_Middlewares/Verify_If_Wishlist_Exists_in_WishlistsDB.js";
import itemtowishlistController from "../controllers/itemtowishlist.js"
const router = express.Router();


router.route('/')

.get([    


], validationMiddleware,jwtMiddleware, wishlistController.getAllWishlists)  



    .post([
        check("wishlistname")
        .exists()
        .withMessage('is required')
        .isLength({ min: 4})
        .withMessage("Wishlist Name need at least 4 characters")
        .matches(/^[a-zA-Z][\w\s-]+/)
        .withMessage("It has to start with a letter"),

        check("wishlistdescription")
        .exists()
        .withMessage('is required')
        .isLength({ min: 10})
        .withMessage("Wishlist description needs at least 10 characters")
        .matches(/^[a-zA-Z][\w\s-]+/)
        .withMessage("It has to start with a letter")
    ], validationMiddleware,jwtMiddleware, wishlistController.createWishlist ) 



    router.route('/:id')
    .put([

        check("wishlistname")
        .optional().exists()
        .withMessage('is required')
        .optional().isLength({ min: 4})
        .withMessage("Wishlist Name need at least 4 characters")
        .optional().matches(/^[a-zA-Z][\w\s-]+/)
        .withMessage("It has to start with a letter"),

        check("wishlistdescription")
        .optional().exists()
        .withMessage('is required')
        .optional().isLength({ min: 10})
        .withMessage("Wishlist description needs at least 10 characters")
        .optional().matches(/^[a-zA-Z][\w\s-]+/)
        .withMessage("It has to start with a letter")


    ], validationMiddleware, jwtMiddleware, Verify_If_Wishlist_Exists_in_WishlistsDB,wishlistController.updateWishlist)

    .delete([

     
      


    ], validationMiddleware, jwtMiddleware,Verify_If_WishList_Exists_In_WhisListsDB,wishlistController.deleteWishlist)




    router.route('/:id/items')
    .get([    
        ],
     validationMiddleware,
     jwtMiddleware, 
     Verify_If_WishList_Exists_In_WhisListsDB,
     itemtowishlistController.getWishlistAllItems)  

    .post([ 
          ],
    validationMiddleware,
    jwtMiddleware,
    Verify_If_WishList_Exists_In_WhisListsDB,
    Verify_If_Item_Body_Exists_In_ItemsDB,
    Verify_if_Item_Body_Exists_In_ItemToWhislistsDB, 
    itemtowishlistController.createItemtoWishlist) 


    router.route('/:id/items/:itemid')
    .delete([   
            ],
    validationMiddleware,
    jwtMiddleware,
    Verify_If_WishList_Exists_In_WhisListsDB,
    Verify_if_Item_Params_Exists_In_ItemToWhislistsDB,
    Verify_if_Item_Params_Exists_In_ItemsDB,
    itemtowishlistController.deleteItemFromWhishList) 
    
    .put([    
         ],
    validationMiddleware,
    jwtMiddleware,
    Verify_If_WishList_Exists_In_WhisListsDB,
    Verify_if_Item_Params_Exists_In_ItemToWhislistsDB,
    Verify_If_Item_Body_Exists_In_ItemsDB,
    Verify_if_Item_Body_Exists_In_ItemToWhislistsDB,
    itemtowishlistController.updateItemtoWishlist) 


















export default router;