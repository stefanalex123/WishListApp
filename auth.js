
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";

const GOOGLE_CLIENT_ID='711866024631-mtpobjso034luc5kfq485dmnuj1mv90v.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET='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';

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback: true,
  },
  async function(request, accessToken, refreshToken, profile, done) {
    const existingUser =  await prisma.user.findUnique({
        where: {
          id:profile.id
        }
      })

      if (existingUser) {
        console.log(profile)
        return done(null, profile);
        }

        const newUser = await prisma.user.create({
            data: {
                id:profile.id,
                username:profile.emails[0].value,
                password:" "
                
            }
  });

        //create new user

    

  return done(null, profile);

  }));



  
  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });