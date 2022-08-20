import express, { request } from "express";
import itemController from "../controllers/item.js"
//import validationMiddleware from "../middleware/others_Middlewares/validationMiddleware.js";
import validationMiddleware from "../middleware/others_Middlewares/validationMiddleware.js";
import { check } from "express-validator";
import { jwtMiddleware } from "../middleware/others_Middlewares/auth.js";

import Verify_If_Item_Exists_In_ItemsDB from "../middleware/Items_Middlewars/Verify_If_Item_Exists_In_ItemsDB.js"



const router = express.Router();


router.route('/')

.get([    
     ], 
validationMiddleware,
jwtMiddleware,
itemController.getAllItems)  


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

    
        
    ],
    validationMiddleware,
    jwtMiddleware, 
    itemController.createItem) 
    
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


    ], 
    validationMiddleware,
    jwtMiddleware, 
   Verify_If_Item_Exists_In_ItemsDB,
    itemController.updateItem)

    .delete([
            ],
    validationMiddleware, 
    jwtMiddleware,
    Verify_If_Item_Exists_In_ItemsDB, 
    itemController.deleteItem)









export default router;