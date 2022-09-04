import userServices from "../services/user.js";
import groupsInvitationServices from "../services/groupsinvitations.js";
import notificationsServices from "../services/notifications.js";
import groupServices from "../services/groups.js";
import userProfileServices from "../services/userprofile.js";
import refferalInvitationsService from "../services/referralsinvitations.js"
import forgotPasswordServices from "../services/forgotpassword.js"
import sendmail from "../../sendmail.js"
import bcrypt from "bcrypt";


const addUser = async (req, res, next) => {
    try {
        const newUser = await userServices.addUser( req.body.username, req.body.password);
        res.json(newUser);
    } catch (err) {
        next(err);
    }
};


const loginUser = async (req, res, next) => {
    try {
        const token = await userServices.loginUser(req.body.username, req.body.password);
        if(token=="InvalidUser"){
            res.send("The username is incorrect")
        }

        if(token=="InvalidPassword"){
            res.send("The password is incorrect")
        }
        else {
        res.send({
            token
        });
    }
    } catch (err) {
        next(err);
    }
};


const addUserByReferralLink = async (req, res, next) => {
    try {
        const newUser = await userServices.addUser( req.body.username, req.body.password);
        const user=await userServices.getUser(req.body.username)
        

        const userProfile=await userProfileServices.createUserProfile(user[0].id, "De adaugat", req.body.username, "De adaugat", "ON")
        //Se creeaza un profil utilizatorului
      
        // Ii adaugam invitatia de grup
        
        const newGroupInvitation= await groupsInvitationServices.createGroupInvitation(req.params.groupId, user[0].id );
        res.json(newUser);

        // modificam statusul invitatiei in "EXPIRED"
        const refferalInvitation= await refferalInvitationsService.getReferralInvitation(req.params.groupId, req.params.userDeliverId, req.params.email)

        try {

            const response = await refferalInvitationsService.updateReferralInvitation(refferalInvitation[0].id ,{
              userDeliverId: refferalInvitation[0].userDeliverId,
              groupId: refferalInvitation[0].groupId,
              emailSend:refferalInvitation[0].emailSend,
              status:"EXPIRED",
            });
          } catch (err) {
            console.error(`Error while updating refferalInvitation`);
            next(err);
          }


    } catch (err) {
        next(err);
    }
};



const updateUserPassword = async (req, res, next) => {
    try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.newPassword, salt);


      const forgotPassword= await forgotPasswordServices.getForgotPasswordById(req.params.forgotPasswordId)
      const userProfile=await userProfileServices.getUserProfileByEmail(forgotPassword.emailUsed)
      const user = await userServices.getUserById(userProfile.userId);
  
      if (!user) {
        throw { message: "User not found" };
      }
  
      const newUser = await userServices.updatePasswordUser(user.id, {
        username:user.username,
        password:hash
      });

      // modificam statusul cererii Forgot Password in "EXPIRED"


      try {

          const newPasswordRequest = await forgotPasswordServices.updateForgotPassword(req.params.forgotPasswordId ,{
            emailUsed:forgotPassword.emailUsed,
            code:forgotPassword.code,
            status:"EXPIRED",
          });
        } catch (err) {
          console.error(`Error while updating request New Password`);
          next(err);
        }
        
      res.json(newUser);
    } catch (err) {
      console.error(`Error while updating User Password`);
      next(err);
    }
  };





export default { addUser, loginUser, addUserByReferralLink, updateUserPassword};