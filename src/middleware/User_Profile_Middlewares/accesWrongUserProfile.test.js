import userProfileServices from "../../services/userprofile.js"
 import httpMocks from 'node-mocks-http'
 import accesWrongUserProfileMiddleware from './accesWrongUserProfile.js';
 
 import { getMockReq, getMockRes } from '@jest-mock/express'
import userprofile from "../../services/userprofile.js";
 
 
 //DONE
 
 describe ('Acces wrong User Profile', ()=> {
     
     
 
     test('access the correct Profile', async () => {
 
        const newUserProfile= await userProfileServices.getUserProfile('6e53024f-d078-43d0-b89e-1de0a7db2bc3')
     const req = getMockReq({
         auth: { userId: newUserProfile.userId},
       })
 
       const { res, next } = getMockRes({
      
       })
 
 
       const result=await accesWrongUserProfileMiddleware (req, res, next)
    
 
       expect(next).toBeCalled()
 

 
 });
 

 
 
 test('accessing an userProfile that doesnt exists', async () => {
   const req = getMockReq({
       auth: { userId: '000000000'},
     })
 
     const res= httpMocks.createResponse();
 
     const result=await accesWrongUserProfileMiddleware(req, res)
  
     expect(res._getData()).toBe("This userprofoile doesn't exists")
 
 });  
 
 });