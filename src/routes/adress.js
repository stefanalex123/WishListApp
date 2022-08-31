import express, { request } from "express";
import validationMiddleware from "../middleware/others_Middlewares/validationMiddleware.js";
import { check } from "express-validator";
import { jwtMiddleware } from "../middleware/others_Middlewares/auth.js";
import adressController from "../controllers/adress.js"
import accesWrongAdressMiddleware from "../middleware/Adress_Middlewares/accesWrongAdressMiddleware.js";


const router = express.Router();

router.route('/')

.get([    
     ], 
     validationMiddleware,
     jwtMiddleware,
     adressController.getAllAdresses)  


    .post([
        check("country")
        .exists()
        .withMessage('Country is required')
        .isAlpha()
        .withMessage("Incorect Country")
        .matches(/^[a-zA-Z][\w\s-]+/)
        .withMessage("Country has to start with a letter"),

        check("city")
        .exists()
        .withMessage('City is required')
        .isAlpha()
        .withMessage('Incorrect City')
        .matches(/^[a-zA-Z][\w\s-]+/)
        .withMessage("City has to start with a letter"),

        check("street")
        .exists()
        .withMessage('Street is required')
        .isLength({ min: 10})
        .withMessage("Street Description needs at least 10 characters"),

        check("flat")
        .exists()
        .withMessage('Flat is required'),

        check("postalCode")
        .exists()
        .withMessage('Postal Code is required')
        .isNumeric()
        .withMessage("Inccorect postal code")
        

    
        
    ], 
    validationMiddleware,
    jwtMiddleware, 
    adressController.createAdress) 


    router.route('/:id')

    .put([
        check("country")
        .optional().exists()
        .withMessage('Country is required')
        .optional().isAlpha()
        .withMessage("Incorect Country")
        .optional().matches(/^[a-zA-Z][\w\s-]+/)
        .withMessage("Country has to start with a letter"),

        check("city")
        .optional().exists()
        .withMessage('City is required')
        .optional().isAlpha()
        .withMessage('Incorrect City')
        .optional().matches(/^[a-zA-Z][\w\s-]+/)
        .withMessage("City has to start with a letter"),

        check("street")
        .optional().exists()
        .withMessage('Street is required')
        .optional().isLength({ min: 10})
        .withMessage("Street Description needs at least 10 characters"),

        check("flat")
        .optional().exists()
        .withMessage('Flat is required'),

        check("postalCode")
        .optional().exists()
        .withMessage('Postal Code is required')
        .optional().isNumeric()
        .withMessage("Inccorect postal code")


    ],
    validationMiddleware,
    jwtMiddleware,
    accesWrongAdressMiddleware, //Verify_If_Acces_Wrong_Adress,
    adressController.updateAdress)

    
    .delete([
           ], 
    validationMiddleware, 
    jwtMiddleware,
    accesWrongAdressMiddleware, //Verify_If_Acces_Wrong_Adress, 
    adressController.deleteAdress)





export default router;