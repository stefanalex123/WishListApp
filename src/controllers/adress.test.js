import e, { response } from "express";
import adressServices from "../services/adress.js"
import adressController from "../controllers/adress.js"
import httpMocks from 'node-mocks-http'

import { getMockReq, getMockRes } from '@jest-mock/express'
import adress from "../services/adress.js";
describe ('Adress Controller',  ()=> {



    test('Creating an adress', async () => {

        const newAdress=await adressServices.createAdress('6e53024f-d078-43d0-b89e-1de0a7db2bc3', 'Romania', 'Constanta', 'Mircea Cel Batran',
        'D09', '9000000')

        const req = getMockReq({
            body: { 
            country: newAdress.country,
            city: newAdress.city,
            street: newAdress.street,
            flat:newAdress.flat,   
            postalCode:newAdress.postalCode

           },
            auth: { userId: '6e53024f-d078-43d0-b89e-1de0a7db2bc3'},
          })
      
          const res= httpMocks.createResponse();
      
          const newAdressController=await adressController.createAdress(req, res)
          const responseAdressController = JSON.parse(res._getData());
          
          expect(responseAdressController).toStrictEqual( {
            "id":responseAdressController.id,
            "userId": newAdress.userId,
            "country": newAdress.country,
            "city": newAdress.city,
            "street": newAdress.street,
            "flat": newAdress.flat,
            "postalCode": newAdress.postalCode
        })
   
      
          const deleteAdress=await adressServices.deleteAdress(newAdress.id)
    });
    

    test('Deleting an adress', async () => {

        const newAdress=await adressServices.createAdress('6e53024f-d078-43d0-b89e-1de0a7db2bc3', 'Romania', 'Constanta', 'Mircea Cel Batran',
        'D09', '9000000')

        const req = getMockReq({
            params: { 
            id: newAdress.id,
           },
            auth: { userId: '6e53024f-d078-43d0-b89e-1de0a7db2bc3'},
          })
      
          const res= httpMocks.createResponse();
      
          const newAdressController=await adressController.deleteAdress(req,res)
          //const responseAdressController = JSON.parse(res._getData());
          
          expect(res._getData()).toStrictEqual('Adress deleted')
   
      

    });

    test('Deleting a wrong adress', async () => {

        const newAdress=await adressServices.createAdress('6e53024f-d078-43d0-b89e-1de0a7db2bc3', 'Romania', 'Constanta', 'Mircea Cel Batran',
        'D09', '9000000')

        const req = getMockReq({
            params: { 
            id: '00000',
           },
            auth: { userId: '6e53024f-d078-43d0-b89e-1de0a7db2bc3'},
          })
      

          
        const { res, next } = getMockRes({
        })
        const result=await adressController.deleteAdress(req, res, next)
 
        expect(next).toBeCalled()


    });
    
    
    

    
    




 test('getting all Adresses', async () => {
   

    const newAdress1=await adressServices.createAdress('6e53024f-d078-43d0-b89e-1de0a7db2bc3', 'Romania', 'Constanta', 'Mircea Cel Batran',
    'D09', '9000000')
    const newAdress2=await adressServices.createAdress('6e53024f-d078-43d0-b89e-1de0a7db2bc3', 'Romania', 'Bucuresti', 'Mircea Cel Batran',
    'D09', '9000000')
const result=await adressServices.getAllAdresses('6e53024f-d078-43d0-b89e-1de0a7db2bc3')
console.log(result.length);
let adresses=[];

for(let i=0;i<result.length;i++){
    let adress = 
        [{
            "id": result[i].id,
            "userId": result[i].userId,
            "country": result[i].country,
            "city": result[i].city,
            "street": result[i].street,
            "flat": result[i].flat,
            "postalCode": result[i].postalCode
        }
    ]

    

    adresses.push(adress)

}


    

        const req = getMockReq({
            auth: { userId: '6e53024f-d078-43d0-b89e-1de0a7db2bc3'},
          })

          const res= httpMocks.createResponse();
      
          const newAdressController=await adressController.getAllAdresses(req, res)
          const responseAdressController = JSON.parse(res._getData());
          console.log(responseAdressController.length)
  
    

        expect(responseAdressController.length).toStrictEqual(adresses.length)



        const deleteAdress1=await adressServices.deleteAdress(newAdress1.id)
        const deleteAdres2=await adressServices.deleteAdress(newAdress2.id)
});







 


  test('Update Andress', async () => {
    const newAdress=await adressServices.createAdress('6e53024f-d078-43d0-b89e-1de0a7db2bc3', 'Romania', 'Constanta', 'Mircea Cel Batran',
        'D09', '9000000')

   

    
    const req = getMockReq({
        params: { id: newAdress.id},
       
      })

      const res= httpMocks.createResponse();
  
      const newAdressController=await adressController.updateAdress(req, res)
      const responseAdressController = JSON.parse(res._getData());



    
    expect(responseAdressController).toStrictEqual(newAdress);
       

    const deleteAdress=await adressServices.deleteAdress(newAdress.id) 


});   



 
});  