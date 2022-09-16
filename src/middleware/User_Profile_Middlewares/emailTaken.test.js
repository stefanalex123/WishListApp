
 //import { accesWrongAdressMiddleware} from './accesWrongAdressMiddleware.js'; // Or whatever file you are testing

 import userProfileServices from "../../services/userprofile.js"
 import httpMocks from 'node-mocks-http'
 import accesWrongUserProfileMiddleware from './accesWrongUserProfile.js';
 
 import { getMockReq, getMockRes } from '@jest-mock/express'
import userprofile from "../../services/userprofile.js";
import emailTakenMiddleware from "./emailTakenMiddleware.js"
 
 
 //DONE
 
 describe ('Email taken', ()=> {
     
     
 
     test('Introducing a valid email ', async () => {
 
        const newUserProfile= await userProfileServices.createUserProfile('a0da629a-b19e-4973-bfaa-419c009872e0', 'focanstfan5555@gmail.com',
        'stefanalex10', '0877762712', 'OFF', '27/12/2000')
 
     const req = getMockReq({
         body:{email:'focanstefan1111@gmail.com'}
       })
 
       const { res, next } = getMockRes({
      
       })
 
 
       const result=await emailTakenMiddleware (req, res, next)
    
 
       expect(next).toBeCalled()
 
       const deleteUserProfile=await userProfileServices.deleteUserProfile(newUserProfile.userId)
 
 });


 test('Introducing an used email ', async () => {
 
    const newUserProfile= await userProfileServices.createUserProfile('a0da629a-b19e-4973-bfaa-419c009872e0', 'focanstefan5555@gmail.com',
    'stefanalex10', '0877762712', 'OFF', '27/12/2000')

 const req = getMockReq({
     body:{email:'focanstefan5555@gmail.com'}
   })
   const res= httpMocks.createResponse();



   const result=await emailTakenMiddleware (req, res)


   expect(res._getData()).toBe("This email is used by other users!")

   const deleteUserProfile=await userProfileServices.deleteUserProfile(newUserProfile.userId) 

}); 




 

 
 

 
 });
 
 
 
 
 
 
 
 
 
 
 
 
  
 
 
 
 
 