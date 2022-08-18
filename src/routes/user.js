import express, { request } from "express";
import usersController from "../controllers/user.js";
import usernameMiddleware from "../middleware/usernameMiddleware.js";
import validationMiddleware from "../middleware/validationMiddleware.js";
import { check } from "express-validator";
import errorsMiddleware from "../middleware/errorsMiddleware.js";
import { jwtMiddleware } from "../middleware/auth.js";

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
        
    ], validationMiddleware,usernameMiddleware, usersController.addUser)

    router.route('/login')
    .post([
        check("username", "Invalid name, it must have at least 4 characters").isLength({ min: 4 }),
        check("password", "Invalid password, it must have at least 4 characters").isLength({ min: 4 })
    ], validationMiddleware, usersController.loginUser)








export default router;