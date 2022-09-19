import userProfileServices from "../../services/userprofile.js"
 import httpMocks from 'node-mocks-http'
 import accesWrongUserProfileMiddleware from './accesWrongUserProfile.js';
 
 import { getMockReq, getMockRes } from '@jest-mock/express'
import userprofile from "../../services/userprofile.js";
import emailTakenMiddleware from "./emailTakenMiddleware.js"
 
 
 //DONE
 
 describe ('Email taken', ()=> {
     
     
 
     test('Introducing a valid email ', async () => {
 
        const newUserProfile= await userProfileServices.getUserProfile('a0da629a-b19e-4973-bfaa-419c009872e0')
 
     const req = getMockReq({
         body:{email:'stefanalex99@gmail.com'}
       })
 
       const { res, next } = getMockRes({
      
       })
 
 
       const result=await emailTakenMiddleware (req, res, next)
    
 
       expect(next).toBeCalled()
 
       
 
 });


 test('Introducing an used email ', async () => {
 
    const newUserProfile= await userProfileServices.getUserProfile('a0da629a-b19e-4973-bfaa-419c009872e0')
 const req = getMockReq({
     body:{email:'stefanalex20@gmail.com'}
   })
   const res= httpMocks.createResponse();



   const result=await emailTakenMiddleware (req, res)


   expect(res._getData()).toBe("This email is used by other users!")



}); 
 })