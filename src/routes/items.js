import express, { request } from "express";
import itemController from "../controllers/item.js"
//import validationMiddleware from "../middleware/others_Middlewares/validationMiddleware.js";
import validationMiddleware from "../middleware/others_Middlewares/validationMiddleware.js";
import { check } from "express-validator";
import { jwtMiddleware } from "../middleware/others_Middlewares/auth.js";
import itemExistsMiddleware from "../middleware/Items_Middlewars/itemExistsMiddleware.js";




const router = express.Router();


router.route('/')

        .get([    
        ], 
        validationMiddleware,
        jwtMiddleware,
        itemController.getAllItems)  

        .post([
        check("itemName")
        .exists()
        .withMessage('is required')
        .isLength({ min: 4})
        .withMessage("Item Title need at least 4 characters")
        .matches(/^[a-zA-Z][\w\s-]+/)
        .withMessage("It has to start with a letter"),

        check("itemLink")
        .exists()
        .withMessage('is required')
        .isURL()
        .withMessage('You have to introduce a link'),

        check("itemDescription")
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
        
        .get([    
        ], 
        validationMiddleware,
        jwtMiddleware,
        itemController.getItem)  

        .put([
        check("itemName")
        .optional().isLength({ min: 4})
        .withMessage("Item Title need at least 4 characters")
        .optional().matches(/^[a-zA-Z][\w\s-]+/)
        .withMessage("It has to start with a letter"),

        check("itemLink")
        .optional().isURL()
        .withMessage('You have to introduce a link'),

        check("itemDescription")
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
     itemExistsMiddleware,                       //Verify_If_Item_Exists_In_ItemsDB,
    itemController.updateItem)

    .delete([   
    ],
    validationMiddleware, 
    jwtMiddleware,
    itemExistsMiddleware,                          //Verify_If_Item_Exists_In_ItemsDB,
    itemController.deleteItem
    )









export default router;