import e from "express";
import randomEmail from "random-email";
import adressServices from "../services/adress.js"
import item from "../services/item.js";
import itemServices from "../services/item.js"
import userProfileServices from "../services/userprofile.js"

import radnomEmail from 'random-email'
describe ('Item Services',  ()=> {


    test('Create an Item', async () => {
   
        
        const newItem= await itemServices.createItem("Item1", '6e53024f-d078-43d0-b89e-1de0a7db2bc3', 'www.altex.ro', 'item description for the item 1');

        
          expect(newItem).toStrictEqual(
            {
                "id": newItem.id,
                "userId":newItem.userId,
                "itemName": newItem.itemName,
                "itemLink": newItem.itemLink,
                "itemDescription": newItem.itemDescription,
                "status": newItem.status,
               
            }
    
          )
          const deleteItem=await itemServices.deleteItem(newItem.id)
    
    });

    test('Delete an Item', async () => {
   
        
        const newItem= await itemServices.createItem("Item1", '6e53024f-d078-43d0-b89e-1de0a7db2bc3', 'www.altex.ro', 'item description for the item 1');
        const deleteItem=await itemServices.deleteItem(newItem.id)
        
          expect(deleteItem).toStrictEqual(
            {
                "id": newItem.id,
                "userId":newItem.userId,
                "itemName": newItem.itemName,
                "itemLink": newItem.itemLink,
                "itemDescription": newItem.itemDescription,
                "status": newItem.status,
               
            }
    
          )
          
    
    });
    
    
    
    
    

    
      test('Getting an Item', async () => {
   
        
    const newItem= await itemServices.createItem("Item1", '6e53024f-d078-43d0-b89e-1de0a7db2bc3', 'www.altex.ro', 'item description for the item 1');

    const item =await itemServices.getItem(newItem.id)
    
      expect(item).toStrictEqual(
        {
            "id": newItem.id,
            "userId":newItem.userId,
            "itemName": newItem.itemName,
            "itemLink": newItem.itemLink,
            "itemDescription": newItem.itemDescription,
            "status": newItem.status,
           
        }

      )
      const deleteItem=await itemServices.deleteItem(newItem.id)

});









 test('getting all Items', async () => {
   
   
    const newItem1= await itemServices.createItem("Item1", '6e53024f-d078-43d0-b89e-1de0a7db2bc3', 'www.altex.ro', 'item description for the item 1');
    const newItem2= await itemServices.createItem("Item2", '6e53024f-d078-43d0-b89e-1de0a7db2bc3', 'www.altex.ro', 'item description for the item 2');
    const result=await itemServices.getAllItems('6e53024f-d078-43d0-b89e-1de0a7db2bc3')

    let items=[];

    for(let i=0;i<result.length;i++){
        let item = 
            {
                "id": result[i].id,
                "userId": result[i].userId,
                "itemName": result[i].itemName,
                "itemLink": result[i].itemLink,
                "itemDescription": result[i].itemDescription,
                "status": result[i].status,
            }
        items.push(item)

    }


    expect(result).toStrictEqual(items)

    const deleteItem1=await itemServices.deleteItem(newItem1.id)
    const deleteItem2=await itemServices.deleteItem(newItem2.id)

});



 


 test('Update Item', async () => {
   
    const newItem= await itemServices.createItem("Item1", '6e53024f-d078-43d0-b89e-1de0a7db2bc3', 'www.altex.ro', 'item description for the item 1');

   
    const result=await itemServices.updateItem(newItem.id,
        {
            "id": newItem.id,
            "userId": newItem.userId,
            "itemName": newItem.itemName,
            "itemLink": 'www.emag.ro',
            "itemDescription": newItem.itemDescription,
            "status": newItem.status,
        }
    )

    
    expect(result).toStrictEqual(
        {
            "id": newItem.id,
            "userId": newItem.userId,
            "itemName": newItem.itemName,
            "itemLink": 'www.emag.ro',
            "itemDescription":newItem.itemDescription,
            "status":newItem.status,    
        }
    )

    const deleteItem=await itemServices.deleteItem(result.id) 
   


});  



/*  test('Delete Andress', async () => {
   
    const newAdress=await adressServices.createAdress('6e53024f-d078-43d0-b89e-1de0a7db2bc3', 'Romania', 'Constanta', 'Mircea Cel Batran',
    'D09', '9000000')
    
    const adressDeleted=await adressServices.deleteAdress(newAdress.id)
    expect(adressDeleted).toStrictEqual({
        "id": adressDeleted.id,
        "userId": adressDeleted.userId,
        "country": adressDeleted.country,
        "city": adressDeleted.city,
        "street": adressDeleted.street,
        "flat": adressDeleted.flat,
        "postalCode": adressDeleted.postalCode
    })
});      
 */

});  
