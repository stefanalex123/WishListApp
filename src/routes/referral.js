import express, { request } from "express";
import usersController from "../controllers/user.js";

import usernameExistsMiddleware from "../middleware/Register_Middlewares/usernameExistsMiddleware.js";
import validationMiddleware from "../middleware/others_Middlewares/validationMiddleware.js";
import { check } from "express-validator";
import errorsMiddleware from "../middleware/others_Middlewares/errorsMiddleware.js";
import { jwtMiddleware } from "../middleware/others_Middlewares/auth.js";
import referralLinkExistsAndValidMiddleware from "../middleware/Referral_Middlewares/referralLinkExistAndValidMiddleware.js"

const router = express.Router();

router.route('/:userDeliverId/groups/:groupId/email/:email')

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
referralLinkExistsAndValidMiddleware,                                      //Verify if refferal link exists and is still Valid
usersController.addUserByReferralLink)

export default router;