import express, { request } from "express";
import usersController from "../controllers/user.js";
import usernameMiddleware from "../middleware/usernameMiddleware.js";
import validationMiddleware from "../middleware/validationMiddleware.js";
import { check } from "express-validator";
import errorsMiddleware from "../middleware/errorsMiddleware.js";
import { jwtMiddleware } from "../middleware/auth.js";
import nicknameMiddleware from "../middleware/nicknameMiddleware.js";
import userprofileController from "../controllers/userprofile.js"
const router = express.Router();


  





router.route('/')
    .post([
        check("email")
        .exists()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email is incorrect"),

        check("nickname")
        .exists()
        .withMessage('Nickname is required')
        .isLength({ min: 4})
        .withMessage("Item Title need at least 4 characters")
        .matches(/^[a-zA-Z][\w\s-]+/)
        .withMessage("It has to start with a letter"),

        check("phonenumber")
        .exists()
        .withMessage("Phone Number is required")
        .isMobilePhone()
        .withMessage("Phone Number Invalid")
        
    ], validationMiddleware,jwtMiddleware, nicknameMiddleware, userprofileController.createUserProfile)

    .put([

     
        check("email")
        .optional().exists()
        .withMessage("Email is required")
        .optional().isEmail()
        .withMessage("Email is incorrect"),

        check("nickname")
        .optional().exists()
        .withMessage('Nickname is required')
        .optional().isLength({ min: 4})
        .withMessage("Item Title need at least 4 characters")
        .optional().matches(/^[a-zA-Z][\w\s-]+/)
        .withMessage("It has to start with a letter"),

        check("phonenumber")
        .optional().exists()
        .withMessage("Phone Number is required")
        .optional().isMobilePhone()
        .withMessage("Phone Number Invalid")


    ], validationMiddleware, jwtMiddleware, nicknameMiddleware, userprofileController.updateUserProfile)

    .get([

     
      


    ], validationMiddleware, jwtMiddleware, userprofileController.getUserProfile)
    .delete([

     
      


    ], validationMiddleware, jwtMiddleware, userprofileController.deleteUserProfile)






    export default router;



