import express, { request } from "express";
import itemController from "../controllers/item.js"
//import validationMiddleware from "../middleware/others_Middlewares/validationMiddleware.js";
import validationMiddleware from "../middleware/others_Middlewares/validationMiddleware.js";
import { check } from "express-validator";
import { jwtMiddleware } from "../middleware/others_Middlewares/auth.js";
import notificationController from "../controllers/notifications.js"

const router = express.Router();

router.route('/')

        .get([    
        ], 
        validationMiddleware,
        jwtMiddleware,
        notificationController.getAllNotifications
        )  




export default router