 //import { accesWrongAdressMiddleware} from './accesWrongAdressMiddleware.js'; // Or whatever file you are testing

 import userProfileServices from "../../services/userprofile.js"
 import httpMocks from 'node-mocks-http'
 import accesWrongUserProfileMiddleware from './accesWrongUserProfile.js';
 
 import { getMockReq, getMockRes } from '@jest-mock/express'
import userprofile from "../../services/userprofile.js";
import emailTakenMiddleware from "./emailTakenMiddleware.js"
import mailsNotificationMiddleware from "./mailsNotificationsMiddleware.js"



describe ('Mails Notifications Middleware', ()=> {
     
     
 
    test('Introducing correct mails notifications format', async () => {

      
    const req = getMockReq({
        body:{mailsNotifications:'ON'}
      })

      const { res, next } = getMockRes({
     
      })


      const result=await mailsNotificationMiddleware (req, res, next)
   

      expect(next).toBeCalled()


});


test('Introducing incorrect mails notifications format', async () => {

      
    const req = getMockReq({
        body:{mailsNotifications:'OPEN'}
      })

      const res= httpMocks.createResponse();


      const result=await mailsNotificationMiddleware(req, res)
   

      expect(res._getData()).toBe("Mails Notifications have to be ON/OFF")


});
})