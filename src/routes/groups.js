import express, { request } from "express";
import validationMiddleware from "../middleware/others_Middlewares/validationMiddleware.js";
import { check } from "express-validator";
import { jwtMiddleware } from "../middleware/others_Middlewares/auth.js";
import groupController from "../controllers/groups.js"
import Verify_if_Owner_Group from "../middleware/Group_Middlewares/Verify_if_Owner_Group.js" 
const router = express.Router();

router.route('/owner')
.get([    


],
    validationMiddleware,
    jwtMiddleware,
    groupController.getAllGroupsWhereOwner)  


router.route('/')
    .post([
        check("grouptitle")
        .exists()
        .withMessage('is required')
        .isLength({ min: 4})
        .withMessage("GroupTtile need at least 4 characters")
        .matches(/^[a-zA-Z][\w\s-]+/)
        .withMessage("It has to start with a letter"),

        check("groupdescription")
        .exists()
        .withMessage('is required')
        .isLength({ min: 10})
        .withMessage("Wishlist description needs at least 10 characters")
        .matches(/^[a-zA-Z][\w\s-]+/)
        .withMessage("It has to start with a letter")
    ],
    validationMiddleware,
    jwtMiddleware,
    groupController.createGroup) 


    router.route('/:id')
    .put([

        check("grouptitle")
        .optional().exists()
        .withMessage('is required')
        .optional().isLength({ min: 4})
        .withMessage("GroupTtile need at least 4 characters")
        .optional().matches(/^[a-zA-Z][\w\s-]+/)
        .withMessage("It has to start with a letter"),

        check("groupdescription")
        .optional().exists()
        .withMessage('is required')
        .optional().isLength({ min: 10})
        .withMessage("Wishlist description needs at least 10 characters")
        .optional().matches(/^[a-zA-Z][\w\s-]+/)
        .withMessage("It has to start with a letter")


    ], validationMiddleware,
        jwtMiddleware,
        Verify_if_Owner_Group,
        groupController.updateGroup)

    .delete([
    ], validationMiddleware,
     jwtMiddleware,
     Verify_if_Owner_Group,
     groupController.deleteGroup)






















export default router;