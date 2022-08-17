import express, { request } from "express";
import usersController from "../controllers/user.js";
import itemController from "../controllers/item.js"
import usernameMiddleware from "../middleware/usernameMiddleware.js";
import itemnameMiddleware from "../middleware/itemnameMiddleware.js"
import itemnameMiddleware2 from "../middleware/itemnameMiddleware2.js"
import validationMiddleware from "../middleware/validationMiddleware.js";
import { check } from "express-validator";
import errorsMiddleware from "../middleware/errorsMiddleware.js";
import { jwtMiddleware } from "../middleware/auth.js";


const router = express.Router();


router.route('/')

.get([    


], validationMiddleware,jwtMiddleware,itemController.getAllItems)  


    .post([
        check("ItemName")
        .exists()
        .withMessage('is required')
        .isLength({ min: 4})
        .withMessage("Item Title need at least 4 characters")
 
        .matches(/^[a-zA-Z][\w\s-]+/)
        .withMessage("It has to start with a letter"),

        check("ItemLink")
        .exists()
        .withMessage('is required')
        .isURL()
        .withMessage('You have to introduce a link'),

        check("ItemDescription")
        .exists()
        .withMessage('is required')
        .isLength({ min: 10})
        .withMessage("Item Description needs at least 10 characters")
       
        .matches(/^[a-zA-Z][\w\s-]+/)
        .withMessage("It has to start with a letter")

    
        
    ], validationMiddleware,jwtMiddleware, itemController.createItem) 
    
    router.route('/:id')
    .put([

     

        check("ItemName")
        .optional().isLength({ min: 4})
        .withMessage("Item Title need at least 4 characters")

        .optional().matches(/^[a-zA-Z][\w\s-]+/)
        .withMessage("It has to start with a letter"),

        check("ItemLink")
   
        .optional().isURL()
        .withMessage('You have to introduce a link'),

        check("ItemDescription")

        .optional().isLength({ min: 10})
        .exists()
        .withMessage('is required')
        .isLength({ min: 10})
        .withMessage("Item Description needs at least 10 characters")
       
        .matches(/^[a-zA-Z][\w\s-]+/)
        .withMessage("It has to start with a letter")


    ], validationMiddleware, jwtMiddleware, itemnameMiddleware2, itemController.updateItem)









export default router;