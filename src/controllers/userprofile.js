import userProfileService from "../services/userprofile.js";
import verifyAccountServices from "../services/verifyaccount.js"
import user from "./user.js";

const deleteUserProfile = async (req, res, next) => {
    try {
        await userProfileService.deleteUserProfile(req.auth.userId);
        res.send("UserProfile deleted");
    } catch (err) {
        next(err);
    }
};

const getUserProfile = async (req,res,next)=>{
    try {
    
      res.json(await userProfileService.getUserProfile(req.auth.userId));
    } catch (err){
      next(err);
    }
  };


const createUserProfile = async (req,res,next) => {
    try {
       const newUserProfile= await userProfileService.createUserProfile(req.auth.userId,req.body.email, 
        req.body.nickname, req.body.phoneNumber, req.body.mailsNotifications, req.body.birthday)
        res.json(newUserProfile);
    } catch (err){
        next (err);
    }

};



const updateUserProfile = async (req, res, next) => {
    try {
      const userProfile = await userProfileService.getUserProfile(req.auth.userId);
  
      if (!userProfile) {
        throw { message: "User Profile not found" };
      }
  
      const response = await userProfileService.updateUserProfile(req.auth.userId, {
        userId: req.auth.userId || userProfile.userId,
        email: req?.body?.email || userProfile.email,
        nickname: req?.body?.nickname || userProfile.nickname,
        phoneNumber:req?.body?.phonenumber || userProfile.phoneNumber,
        mailsNotifications:req.body.mailsNotifications || userProfile.mailsNotifications,
        socketId:userProfile.socketId,
        verifiedAccount:userProfile.verifiedAccount
        
      });
  
      res.json(response);
    } catch (err) {
      console.error(`Error while updating userProfile`);
      next(err);
    }
  };



  const updateUserProfileVerifiedAccount = async (req, res, next) => {
    try {

      const verifyAccount= await verifyAccountServices.getVerifyAccountById(req.params.verifyAccountId)
      const userProfile = await userProfileService.getUserProfileByEmail(verifyAccount.emailUsed);
  
      if (!userProfile) {
        throw { message: "User Profile not found" };
      }
     
  
      const userProfileVerified = await userProfileService.updateUserProfile(userProfile.userId, {
        userId: userProfile.userId,
        email:  userProfile.email,
        nickname: userProfile.nickname,
        phoneNumber:userProfile.phoneNumber,
        mailsNotifications: userProfile.mailsNotifications,
        socketId:userProfile.socketId,
        verifiedAccount:"VERIFIED"
      });

      //facem update la invitatie

      try{

        const newVerifyAccount = await verifyAccountServices.updateVerifyAccount(verifyAccount.id, {
          emailUsed:verifyAccount.emailUsed,
          code:verifyAccount.code,
          status:"EXPIRED"
        });


      } catch (err){
        console.error ('Error while updating Verify Account Invitation')
      }
 
  
      res.json(userProfileVerified);
    } catch (err) {
      console.error(`Error while updating userProfile`);
      next(err);
    }
  };








export default {createUserProfile, updateUserProfile, getUserProfile, deleteUserProfile, updateUserProfileVerifiedAccount}