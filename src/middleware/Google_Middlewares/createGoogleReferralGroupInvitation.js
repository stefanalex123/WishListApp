import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import refferalInvitationsService from "../../services/referralsinvitations.js"
import groupsInvitationServices from "../../services/groupsinvitations.js"

import randomEmail from "random-email";
import userProfileServices from "../../services/userprofile.js";
const prisma = new PrismaClient();




const createGoogleReferralGroupInvitation = async (req, res, next) => {
    

    try {
    
        console.log(req.user.id)
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
       
        //const userProfile=await userProfileServices.createUserProfile(existingUser.id, "random21321@gmail.com", "nickname12312", "De adaugat", "ON", "De adaugat")
       
       
        

       const token=geneateAuthToken(req.user.id, req.user.emails[0].value)
       const userProfile=await userProfileServices.createUserProfile(existingUser.id, randomEmail(), req.user.family_name, "De adaugat", "ON", "De adaugat")
       const refferalInvitation= await refferalInvitationsService.getReferralInvitationByEmailSend(req.user.emails[0].value)
       //console.log(refferalInvitation.groupId)
       
       const newGroupInvitation= await groupsInvitationServices.createGroupInvitation(refferalInvitation[0].groupId, existingUser.id);

       
       const response = await refferalInvitationsService.updateReferralInvitation(refferalInvitation[0].id ,{
        userDeliverId: refferalInvitation.userDeliverId,
        groupId: refferalInvitation.groupId,
        emailSend:refferalInvitation.emailSend,
        status:"EXPIRED",
        
      });



       res.status(200).send(token)
      }
     else {
      next();
     }
    } catch (error) {
       res.status(409).send("You already sing up with this email!")
    next();
    }
    
    }


    export default createGoogleReferralGroupInvitation