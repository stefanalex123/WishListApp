import e, { response } from "express";
import adressServices from "../services/adress.js"
import adressController from "../controllers/adress.js"
import httpMocks from 'node-mocks-http'

import { getMockReq, getMockRes } from '@jest-mock/express'
import adress from "../services/adress.js";
import itemService from "../services/item.js"
import itemController from "../controllers/item.js"
describe ('Items Controller',  ()=> {



    test('Creating an Item', async () => {

        const newItem= await itemService.createItem("Item1", '6e53024f-d078-43d0-b89e-1de0a7db2bc3', 'www.altex.ro', 'item description for the item 1');
        const req = getMockReq({
            body: { 
            itemName: newItem.itemName,
            itemLink: newItem.itemLink,
            itemDescription: newItem.itemDescription,
            status:newItem.status
           },
            auth: { userId: '6e53024f-d078-43d0-b89e-1de0a7db2bc3'},
          })
      
          const res= httpMocks.createResponse();
      
          const newItemController=await itemController.createItem(req, res)
          const responseAdressController = JSON.parse(res._getData());
          
          expect(responseAdressController).toStrictEqual( {
            "id":responseAdressController.id,
            "userId": newItem.userId,
            "itemName":newItem.itemName,
            "itemLink":newItem.itemLink,
            "itemDescription":newItem.itemDescription,
            "status":newItem.status
        })
   
      
          const deleteItem=await itemService.deleteItem(newItem.id)
    });


    
    test('Getting an Item', async () => {

        const newItem= await itemService.createItem("Item1", '6e53024f-d078-43d0-b89e-1de0a7db2bc3', 'www.altex.ro', 'item description for the item 1');
        const req = getMockReq({
            
            params: { id: newItem.id},
          })
      
          const res= httpMocks.createResponse();
      
          const newItemController=await itemController.getItem(req, res)
          const responseItemController = JSON.parse(res._getData());
          
          expect(responseItemController).toStrictEqual(newItem)
   
          const deleteItem=await itemService.deleteItem(newItem.id)
    });
    

     test('Deleting an Item', async () => {
       
        const newItem= await itemService.createItem("Item1", '6e53024f-d078-43d0-b89e-1de0a7db2bc3', 'www.altex.ro', 'item description for the item 1');
        
        const req = getMockReq({
            params: { id: newItem.id},
          })
      
          const res= httpMocks.createResponse();
      
          const newItemController=await itemController.deleteItem(req,res)
          //const responseAdressController = JSON.parse(res._getData());
          
          expect(res._getData()).toStrictEqual('Item deleted')
   
      

    });

      test('Deleting a wrong item', async () => {

        const newItem= await itemService.createItem("Item1", '6e53024f-d078-43d0-b89e-1de0a7db2bc3', 'www.altex.ro', 'item description for the item 1');
        const req = getMockReq({
            params: { 
            id: '00000',
           },
       
          })
      

          
        const { res, next } = getMockRes({
        })
        const result=await itemController.deleteItem(req, res, next)
 
        expect(next).toBeCalled()


    }); 
    
    
    

    
    




 test('getting all Items', async () => {
   

    const newItem1= await itemService.createItem("Item1", '6e53024f-d078-43d0-b89e-1de0a7db2bc3', 'www.altex.ro', 'item description for the item 1');
    const newItem2= await itemService.createItem("Item1", '6e53024f-d078-43d0-b89e-1de0a7db2bc3', 'www.altex.ro', 'item description for the item 1');
    const result=await itemService.getAllItems('6e53024f-d078-43d0-b89e-1de0a7db2bc3')
    //console.log(result.length);
let items=[];

for(let i=0;i<result.length;i++){
    let item = 
        [{
            "id":result[i].id,
            "userId": result[i].userId,
            "itemName":result[i].itemName,
            "itemLink":result[i].itemLink,
            "itemDescription":result[i].itemDescription,
            "status":result[i].status
        }
    ]

    items.push(item)

}


    

        const req = getMockReq({
            auth: { userId: '6e53024f-d078-43d0-b89e-1de0a7db2bc3'},
          })

          const res= httpMocks.createResponse();
      
          const newItemController=await itemController.getAllItems(req,res)
          const responseItemController = JSON.parse(res._getData());
          //console.log(responseAdressController.length)
  
    

        expect(responseItemController.length).toStrictEqual(items.length)



        const deleteItem1=await itemService.deleteItem(newItem1.id)
        const deleteItem2=await itemService.deleteItem(newItem2.id)
});







 


  test('Update Item', async () => {
    const newItem= await itemService.createItem("Item1", '6e53024f-d078-43d0-b89e-1de0a7db2bc3', 'www.altex.ro', 'item description for the item 1');

   

    
    const req = getMockReq({
        params: { id: newItem.id},
       
      })

      const res= httpMocks.createResponse();
  
      const newItemController=await itemController.updateItem(req, res)
      const responseItemController = JSON.parse(res._getData());


    expect(responseItemController).toStrictEqual(newItem);
       

    const deleteItem=await itemService.deleteItem(newItem.id) 


});   
   


 
});  