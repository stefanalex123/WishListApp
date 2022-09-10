import dotenv from "dotenv";
import express from "express";
import { Server } from "socket.io";
import nodeCron from "node-cron"
import nodemailer from "nodemailer";
import bodyParser from "body-parser";
import gmailRouter from './src/routes/gmail.js'
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
import referralRouter from "./src/routes/referral.js"
import userProfileService from "./src/services/userprofile.js";
import { jwtMiddleware } from "./src/middleware/others_Middlewares/auth.js"
import jwt from "jsonwebtoken";
import passport from "passport";
import session from "express-session";
import "./googleAuth.js";
import sendmail from "./sendmail.js";
import { PrismaClient } from "@prisma/client";
import jobBirthdayNotification from "./birthdayNotification.js"
import createGoogleToken from "./src/middleware/Google_Middlewares/createGoogleToken.js";


const prisma = new PrismaClient()
const router = express.Router();
dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


app.use("/users", userRouter);
app.use("/items", itemRouter);
app.use("/userprofile", userprofileRouter);
app.use("/adress", useradressRouter)
app.use("/wishlists", wishlistRouter)
app.use ("/groups", groupRouter)
app.use("/invitations",invitationsRouter)
app.use("/notifications", notificationRouter)
app.use("/referral", referralRouter)

app.use("/gmail", gmailRouter)




  const PORT = 3000;
  const server = app.listen(PORT, function () {
      console.log(`Listening on port ${PORT}`);
      console.log(`http://localhost:${PORT}`);
  });
  

  
  
//BIRTHDAY NOTIFICATION
  //jobBirthdayNotification.start();
  





/////////////socket.io
const io = new Server(server);


io.use ((socket, next) => {


  if (socket.handshake?.headers?.token) {
    jwt.verify(socket.handshake?.headers?.token, '709dffa5f8fcfcdd8498864ef979c19a049530f18afc202deafb981250f9973b084dd70013782753c93df20cc5ced9a0bd250d748718c067c19685b8095c570d', (err, decoded) => {
      if (err) {
        return next(new Error('Authentication error'));
      }
      socket.decoded = decoded;
      console.log(socket.decoded.userId)

      next();
    });
  } else {
    next(new Error('Authentication error'));
  }


})



.on ('connection',  async (socket) => {

  const userProfileConectted = await prisma.userProfile.findUnique({
    where: {
      userId:socket.decoded.userId
    }
  })
  console.log(userProfileConectted.socketId)

  try {
    const profileConnected = await userProfileService.updateUserProfile(userProfileConectted.userId, {
      userId: userProfileConectted.userId,
      email: userProfileConectted.email,
      nickname:  userProfileConectted.nickname,
      phoneNumber:userProfileConectted.phoneNumber,
      mailsNotifications:userProfileConectted.mailsNotifications,
      socketId:socket.id
    });
    console.log(profileConnected)
  
  } catch (err) {
    console.log("error")
  
  }







  socket.on('message', async (message) => {
    const userProfileSearched = await prisma.userProfile.findUnique({
      where: {
        userId:message.messageSendTo
      }
    })
      var room=userProfileSearched.socketId;
    //console.log(userProfileSearched)
     console.log(message.nickname)
     message.messageSendBy=userProfileConectted.nickname;
     message.messageSendTo=userProfileSearched.nickname;
    io.to(room).emit("message", message)
  });
});









