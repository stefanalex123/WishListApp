import accesWrongAdressMiddleware from './accesWrongAdressMiddleware.js';
import userController from "../../controllers/adress.js"
import adressServices from "../../services/adress.js"

import httpMocks from 'node-mocks-http'

import { getMockReq, getMockRes } from '@jest-mock/express'


//DONE

describe ('Acces wrong adress', ()=> {
    
    

    test('correct userId and adress id', async () => {

      const newAdress=await adressServices.createAdress('6e53024f-d078-43d0-b89e-1de0a7db2bc3', 'Romania', 'Constanta', 'Mircea Cel Batran',
      'D09', '9000000')

    const req = getMockReq({
        params: { id: newAdress.id },
        auth: { userId: newAdress.userId},
      })

      const { res, next } = getMockRes({
     
      })


      const result=await accesWrongAdressMiddleware(req, res, next)
   
     

      expect(next).toBeCalled()

      const deleteAdress=await adressServices.deleteAdress(newAdress.id) 

});



test('accessing wrong adress', async () => {

  const newAdress=await adressServices.createAdress('a0da629a-b19e-4973-bfaa-419c009872e0', 'Romania', 'Constanta', 'Mircea Cel Batran',
  'D09', '9000000')

  const req = getMockReq({
      params: { id: newAdress.id },
      auth: { userId: '6e53024f-d078-43d0-b89e-1de0a7db2bc3'},
    })

    const res= httpMocks.createResponse();

    const result=await accesWrongAdressMiddleware(req, res)
 
    expect(res._getData()).toBe("You are not owner of this adress")

    const deleteAdress=await adressServices.deleteAdress(newAdress.id) 

});


test('accessing an adress that doesnt exists', async () => {
  const req = getMockReq({
      params: { id: '4ae658' },
      auth: { userId: 'a0d872e0'},
    })

    const res= httpMocks.createResponse();

    const result=await accesWrongAdressMiddleware(req, res)
 
    expect(res._getData()).toBe("This adress doesn't exists")

}); 

});
