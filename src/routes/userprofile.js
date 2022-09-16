import express, { request } from "express";
import validationMiddleware from "../middleware/others_Middlewares/validationMiddleware.js";
import { check } from "express-validator";
import { jwtMiddleware } from "../middleware/others_Middlewares/auth.js";
import birthdayMiddleware from "../middleware/User_Profile_Middlewares/birthdayMiddleware.js";
import userprofileController from "../controllers/userprofile.js"
import verifyAccountController from "../controllers/verifyaccount.js"
import nicknameTakenMiddleware from "../middleware/User_Profile_Middlewares/nicknameTakenMiddleware.js";
import verifyAccountNotSentAndAccountUnverifiedMiddleware from "../middleware/VerifyAccount_Middlewares/verifyAccountNotSentAndAccountUnverifiedMiddleware.js";
import verifyAccountSentActiveAndAccesCodeMiddleware from "../middleware/VerifyAccount_Middlewares/verifyAccountSentActiveAndAccesCodeMiddleware.js";
import mailsNotificationMiddleware from "../middleware/User_Profile_Middlewares/mailsNotificationsMiddleware.js";
import userprofileCreatedMiddleware from "../middleware/User_Profile_Middlewares/userprofileCreadMiddleware.js"
import accesWrongUserProfileMiddleware from "../middleware/User_Profile_Middlewares/accesWrongUserProfile.js";
import emailTakenMiddleware from "../middleware/User_Profile_Middlewares/emailTakenMiddleware.js";
import statusProfileMiddleware from "../middleware/User_Profile_Middlewares/statusPorfileMiddleware.js";
import publicUserProfileMiddleware from "../middleware/User_Profile_Middlewares/publicUserProfileMiddleware.js";
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
    userprofileCreatedMiddleware,//Verify if the userProfile is already created
    birthdayMiddleware, // Verify if the birthday format is valid
    mailsNotificationMiddleware, // Verify if the mailsNotification format is valid
    nicknameTakenMiddleware, //Verify if Nickname taken by other user
    emailTakenMiddleware, //Verify if the email taken by other user
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
        .withMessage("Phone Number Invalid"),

        check("birthday")
        .optional().exists()
        .withMessage('Birthday is required'),

        check("mailsNotifications")
        .optional().exists()
        .withMessage("MailsNotifications is required")


    ],
    validationMiddleware,
    jwtMiddleware,
    accesWrongUserProfileMiddleware,// Verify if the userprofile exists before you modify it
    birthdayMiddleware, // Verify if the birthday format is valid
    mailsNotificationMiddleware, // Verify if the mailsNotification format is valid    
    statusProfileMiddleware,// Verify if the status of the profile is valid          
    nicknameTakenMiddleware, //Verify if Nickname taken by other user
    emailTakenMiddleware, //Verify if the email taken by other user
    userprofileController.updateUserProfile)

    .get([
    ],
    validationMiddleware,
    jwtMiddleware,
    userprofileController.getMyCompleteProfile)

    .delete([
    ],
    validationMiddleware,
    jwtMiddleware,
    accesWrongUserProfileMiddleware,// Verify if the userprofile exists before you delete it
    userprofileController.deleteUserProfile)


    router.route('/verifyaccount')
    .post([     
    ],
    validationMiddleware,
    jwtMiddleware,
    verifyAccountNotSentAndAccountUnverifiedMiddleware, // And if user profile is created
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
    //Verify_If_Code_Is_Correct
    //Verify_If_emailUsed_Is_related_to_user_profile
    //Verify_If_Verify_Account_is_Active
    verifyAccountSentActiveAndAccesCodeMiddleware,
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

     userprofileController.updateUserProfileVerifiedAccount
    )










    export default router;



