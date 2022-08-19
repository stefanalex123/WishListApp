import express, { request } from "express";
import usersController from "../controllers/user.js";
import usernameMiddleware from "../middleware/usernameMiddleware.js";
import validationMiddleware from "../middleware/validationMiddleware.js";
import { check } from "express-validator";
import errorsMiddleware from "../middleware/errorsMiddleware.js";
import { jwtMiddleware } from "../middleware/auth.js";
import nicknameMiddleware from "../middleware/nicknameMiddleware.js";
import userprofileController from "../controllers/userprofile.js"
import wishlistController from "../controllers/wishlist.js"
import wishlistidMiddleware from "../middleware/wishlistidMiddleware.js";
import wishlist from "../services/wishlist.js";
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


    ], validationMiddleware, jwtMiddleware, wishlistidMiddleware,wishlistController.updateWishlist)

    .delete([

     
      


    ], validationMiddleware, jwtMiddleware,wishlistidMiddleware,wishlistController.deleteWishlist)













export default router;