import express, { request } from "express";
import usersController from "../controllers/user.js";

import usernameExistsMiddleware from "../middleware/Register_Middlewares/usernameExistsMiddleware.js";
import validationMiddleware from "../middleware/others_Middlewares/validationMiddleware.js";
import { check } from "express-validator";
import errorsMiddleware from "../middleware/others_Middlewares/errorsMiddleware.js";
import { jwtMiddleware } from "../middleware/others_Middlewares/auth.js";
import requestForgotPasswordController from "../controllers/forgotpassword.js"
import verifyForgotPasswordNotSentMiddleware from "../middleware/Forgot_Password_Middlewares/verifyForgotPasswordNotSentMiddleware.js";
import verifyUserProfileVerifiedMiddleware from "../middleware/Forgot_Password_Middlewares/verifyUserProfileVerifiedMiddleware.js";
import verifyForgotPasswordSentActiveAndAccesCodeMiddleware from "../middleware/Forgot_Password_Middlewares/verifyForgotPasswordSentActiveAndAccesCodeMiddleware.js";
import confirmNewPasswordMiddleware from "../middleware/Forgot_Password_Middlewares/confirmNewPasswordMiddleware.js";
const router = express.Router();


    router.route('/register')

    .post([
        check("password")
        .exists()
        .withMessage('is required')
        .isLength({ min: 7 })
        .withMessage("Password need at least 7 characters")
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{7,}$/, "i")
        .withMessage("Password need at least one letter, one number and one special character"),

        check("username")
        .exists()
        .withMessage('is required')
        .isLength({ min: 5 })
        .withMessage("Username need at least 5 characters")
        .isAlphanumeric()
        .withMessage("You cant have special characters in your username")
        .matches(/^[a-zA-Z][\w\s-]+/)
        .withMessage("It has to start with a letter")
        
    ], 
    validationMiddleware,
    usernameExistsMiddleware,               //Verify_if_Username_exists_in_UsersDB, 
    usersController.addUser)

    router.route('/login')
    
    .post([
        check("username", "Invalid name, it must have at least 4 characters").isLength({ min: 4 }),
        check("password", "Invalid password, it must have at least 4 characters").isLength({ min: 4 })
    ],
    validationMiddleware,
    usersController.loginUser)


    router.route('/forgotpassword')

    .post([
        check("email")
        .exists()
        .withMessage('is required')
        .isLength({ min: 7 })
        .withMessage("Password need at least 7 characters")
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{7,}$/, "i")
        .withMessage("Password need at least one letter, one number and one special character"),
        
    ], 
    validationMiddleware,
    usernameExistsMiddleware,
    verifyUserProfileVerifiedMiddleware,
    verifyForgotPasswordNotSentMiddleware, //+ if is active or expired
      
    requestForgotPasswordController.createForgotPassword)

    router.route('/changepassword/:forgotPasswordId')

    .post([
        check("code")
        .exists()
        .withMessage('is required'),

        check("newPassword")
        .exists()
        .withMessage('is required')
        .isLength({ min: 7 })
        .withMessage("Password need at least 7 characters")
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{7,}$/, "i")
        .withMessage("Password need at least one letter, one number and one special character"),

        check("confirmNewPassword")
        .exists()
        .withMessage('is required'),
        
    ], 
    validationMiddleware,
    usernameExistsMiddleware,
    verifyForgotPasswordSentActiveAndAccesCodeMiddleware, //Verify if request exists, is active and code is valid
    confirmNewPasswordMiddleware,     //Verify if newPassword and confirmNewPassword equal
    usersController.updateUserPassword)





export default router;