import userprofileService from "../services/userprofile.js"
import user from "./user.js";

const deleteUserProfile = async (req, res, next) => {
    try {
        await userprofileService.deleteUserProfile(req.auth.userid);
        res.send("UserProfile deleted");
    } catch (err) {
        next(err);
    }
};

const getUserProfile = async (req,res,next)=>{
    try {
      res.json(await userprofileService.getUserProfile(req.auth.userid));
    } catch (err){
      next(err);
    }
  };


const createUserProfile = async (req,res,next) => {
    try {
       const newuserprofile= await userprofileService.createuserprofile(req.auth.userid,req.body.email, 
        req.body.nickname, req.body.phonenumber)
        res.json(newuserprofile);
    } catch (err){
        next (err);
    }

};



const updateUserProfile = async (req, res, next) => {
    try {
    
  
      const userprofile = await userprofileService.getUserProfile(req.auth.userid);
  
      if (!userprofile) {
        throw { message: "User Profile not found" };
      }
  
      const response = await userprofileService.updateUserProfile(req.auth.userid, {
        userid: req.auth.userid || userprofile.userid,
        email: req?.body?.email || userprofile.email,
        nickname: req?.body?.nickname || userprofile.nickname,
        phonenumber:req?.body?.phonenumber || userprofile.phonenumber,
      });
  
      res.json(response);
    } catch (err) {
      console.error(`Error while updating userProfile`);
      next(err);
    }
  };

export default {createUserProfile, updateUserProfile, getUserProfile, deleteUserProfile}