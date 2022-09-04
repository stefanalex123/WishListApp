import verifyAccountServices from "../services/verifyaccount.js"
import userProfileServices from "../services/userprofile.js"
import sendmail from "../../sendmail.js"
import bcrypt from "bcrypt";




const createVerifyAccount= async(req,res,next) =>{

    const salt = bcrypt.genSaltSync(10);
    const code=Math.floor(1000 + Math.random() * 9000).toString()
    const hash = bcrypt.hashSync(code, salt);
    const userprofile= await userProfileServices.getUserProfile(req.auth.userId)

    try{
      const newVerifyAccount= await verifyAccountServices.createVerifyAccount(
        userprofile.email,
        hash,
        "PENDING"
        )
   

      //trimitem mail

      //const forgotPassword= await forgotPasswordServices.getForgotPassword(req.body.email)
  
    

       sendmail("VERIFY YOUR ACCOUNT", "http://localhost:3000/userprofile/verifyaccount/"+ newVerifyAccount.id
       +" \n + CODUL ESTE:" + code
       , userprofile.email)
       res.json(newVerifyAccount);
  } catch (err){
      next(err);
  }
  
  };


  






  export default {createVerifyAccount}