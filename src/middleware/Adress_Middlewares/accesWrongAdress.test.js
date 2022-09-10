
//import { accesWrongAdressMiddleware} from './accesWrongAdressMiddleware.js'; // Or whatever file you are testing
import accesWrongAdressMiddleware from './accesWrongAdressMiddleware.js';
import userController from "../../controllers/adress.js"

import httpMocks from 'node-mocks-http'

import { getMockReq, getMockRes } from '@jest-mock/express'



describe ('Acces wrong adress', ()=> {
    
    

    test('correct userId and adress id', async () => {
    const req = getMockReq({
        params: { id: '123' },
        auth: { userId: '67e5478d-7f95-4d25-ba1b-3f7acf0f128e'},
      })

      const { res, next } = getMockRes({
     
      })


      const result=await accesWrongAdressMiddleware(req, res, next)
   
     

      expect(next).toBeCalled()

});



});



