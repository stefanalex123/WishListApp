
import express from "express";
import { jwtMiddleware } from "../../src/middleware/others_Middlewares/auth.js"
import passport from "passport";
import "../../googleAuth.js"
import createGoogleToken from "../middleware/Google_Middlewares/createGoogleToken.js";
import gmailController from "../controllers/gmail.js"
const app = express()

const router = express.Router();

router.route('/logged')

.get([   
     ], 
     
     createGoogleToken,
    )  

router.route('/')
.get([   
], 

gmailController.getLoginAdress)  

router.route('/auth/google')
.get([  
     
], 
passport.authenticate('google', { scope: [ 'email', 'profile' ] }),

) 

router.route('/auth/google/callback')
.get([  
     
], 
passport.authenticate( 'google', {
    successRedirect: '/gmail/logged',
    failureRedirect: '/gmail/auth/google/failure'
  })
) 



  
  


export default router;