import express, { request } from "express";
import validationMiddleware from "../middleware/others_Middlewares/validationMiddleware.js";
import { check } from "express-validator";
import { jwtMiddleware } from "../middleware/others_Middlewares/auth.js";

import userprofileController from "../controllers/userprofile.js"
import verifyAccountController from "../controllers/verifyaccount.js"
import nicknameTakenMiddleware from "../middleware/User_Profile_Middlewares/nicknameTakenMiddleware.js";
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

        check("phoneNumber")
        .exists()
        .withMessage("Phone Number is required")
        .isMobilePhone()
        .withMessage("Phone Number Invalid"),

        check("birthday")
        .exists()
        .withMessage('Birthday is required'),

        check("mailsNotifications")
        .exists()
        .withMessage("MailsNotifications is required")
        
    ],
    validationMiddleware,
    jwtMiddleware,
    nicknameTakenMiddleware, //Verify_if_Nickname_taken,
    userprofileController.createUserProfile)

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

        check("phoneNumber")
        .optional().exists()
        .withMessage("Phone Number is required")
        .optional().isMobilePhone()
        .withMessage("Phone Number Invalid")


    ],
    validationMiddleware,
    jwtMiddleware,
    nicknameTakenMiddleware,              //Verify_if_Nickname_taken,
    userprofileController.updateUserProfile)

    .get([
    ],
    validationMiddleware,
    jwtMiddleware,
    userprofileController.getUserProfile)

    .delete([
    ],
    validationMiddleware,
    jwtMiddleware,
    userprofileController.deleteUserProfile)


    router.route('/verifyaccount')
    .post([     
    ],
    validationMiddleware,
    jwtMiddleware,
     //
     verifyAccountController.createVerifyAccount
    )

    router.route('/verifyaccount/:verifyAccountId')
    .post([
        check("code")
        .exists()
        .withMessage('is required'), 

    ],
    validationMiddleware,
    jwtMiddleware,
    //
     userprofileController.updateUserProfileVerifiedAccount
    )

    router.route('/deleteaccount')
    .post([
        check("code")
        .exists()
        .withMessage('is required'), 

    ],
    validationMiddleware,
    jwtMiddleware,
    //
     userprofileController.updateUserProfileVerifiedAccount
    )










    export default router;



