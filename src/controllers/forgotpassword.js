import forgotPasswordServices from "../services/forgotpassword.js"
import userProfileServices from "../services/userprofile.js"
import userServices   from "../services/user.js"
import sendmail from "../../sendmail.js"
import bcrypt from "bcrypt";
import userprofile from "./userprofile.js";




const createForgotPassword= async(req,res,next) =>{

    const salt = bcrypt.genSaltSync(10);
    const code=Math.floor(1000 + Math.random() * 9000).toString()
    const hash = bcrypt.hashSync(code, salt);
 
    try{
      const newForgotPassword= await forgotPasswordServices.createForgotPassword(
        req.body.email,
        hash,
        "AVAILABLE"
        )
   

      //trimitem mail

      //const forgotPassword= await forgotPasswordServices.getForgotPassword(req.body.email)
  
    

       sendmail("CHANGE PASSWORD", "http://localhost:3000/users/changepassword/"+ newForgotPassword.id 
       +" \n + CODUL ESTE:" + code
       , req.body.email)
       res.json(newForgotPassword);
  } catch (err){
      next(err);
  }
  
  };


  const updateVerifyAccount = async (req, res, next) => {
    try {
    
      const group= await groupServices.getGroup(req.params.id);
  
      if (!group) {
        throw { message: "Group not found" };
      }
  
      const response = await groupServices.updateGroup(req.params.id, {
        groupTitle: req?.body?.groupTitle || group.groupTitle,
        groupDescription: req?.body?.groupDescription || group.groupDescription,
      });
      res.json(response);
    } catch (err) {
      console.error(`Error while updating Group`);
      next(err);
    }
}


  






  export default {createForgotPassword}