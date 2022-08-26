import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import userRouter from "./src/routes/user.js";
import itemRouter from "./src/routes/items.js"
import userprofileRouter from "./src/routes/userprofile.js"
import cors from 'cors'
import userprofile from "./src/services/userprofile.js";
import useradressRouter from"./src/routes/adress.js";
import wishlistRouter from "./src/routes/wishlist.js"
import groupRouter from "./src/routes/groups.js"
import invitationsRouter from "./src/routes/invitations.js"
import notificationRouter from "./src/routes/notifications.js"

import { jwtMiddleware } from "./src/middleware/others_Middlewares/auth.js"
import jwt from "jsonwebtoken";

import passport from "passport";
import session from "express-session";
import "./auth.js";
import { PrismaClient } from "@prisma/client";



const router = express.Router();


dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));


const port = process.env.PORT || 3000;





//Link router to app
//app.use('/courses', router);


app.use("/users", userRouter);
app.use("/items", itemRouter);
app.use("/userprofile", userprofileRouter);
app.use("/adress", useradressRouter)
app.use("/wishlists", wishlistRouter)
app.use ("/groups", groupRouter)
app.use("/invitations",invitationsRouter)
app.use("/notifications", notificationRouter)
const prisma = new PrismaClient()

async function creategoogletoken(req, res, next) {

try {


  const existingUser =  await prisma.user.findUnique({
    
    where: {
      id:req.user.id
    }
  })
  const geneateAuthToken = (id, email) => {
    return jwt.sign(
        { userId: id,
          email:email
             },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
}

  if(existingUser){
   res.send(geneateAuthToken(req.user.id, req.user.emails[0].value))
  }
 else {
  next();
 }
} catch (error) {
next();
}

}


app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/testing',creategoogletoken ,jwtMiddleware, (req,res) =>{


res.send('cont logat cu google cu ' + req.auth.userId);

});



app.get('/', (req, res) => {
res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.get('/auth/google',
passport.authenticate('google', { scope: [ 'email', 'profile' ] }
));

app.get( '/auth/google/callback',
passport.authenticate( 'google', {
  successRedirect: '/testing',
  failureRedirect: '/auth/google/failure'
})
);

app.get('/protected',  (req, res) => {


  
res.send(req.user.emails);
});

app.get('/logout', (req, res) => {
req.logout();
req.session.destroy();
res.send('Goodbye!');
});

app.get('/auth/google/failure', (req, res) => {
res.send('Failed to authenticate..');
});


app.listen(port, "0.0.0.0", () => {
  console.log(`Example app listening at http://localhost:${port}`);
});