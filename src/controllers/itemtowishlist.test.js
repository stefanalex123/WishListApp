import e, { response } from "express";
import adressServices from "../services/adress.js"
import adressController from "../controllers/adress.js"
import httpMocks from 'node-mocks-http'

import { getMockReq, getMockRes } from '@jest-mock/express'
import adress from "../services/adress.js";
import wishlistServices from "../services/wishlist.js"
import itemService from "../services/item.js"
import itemController from "../controllers/item.js"
import itemToWishlistServices from "../services/itemtowishlist.js"
import itemToWishlistController from "../controllers/itemtowishlist.js"
import itemtowishlist from "../services/itemtowishlist.js";
describe ('Items To Wishlist Controller',  ()=> {



    test('Adding an item To Wishlist', async () => {

        const newItem= await itemService.createItem("Item1", '6e53024f-d078-43d0-b89e-1de0a7db2bc3', 'www.altex.ro', 'item description for the item 1');
        const newWishlist=await wishlistServices.createWishlist('6e53024f-d078-43d0-b89e-1de0a7db2bc3', 'wishlist1', 'wishlist1Description');
        const newItemToWishlist=await itemToWishlistServices.createItemToWishlist(newWishlist.id, newItem.id)
        
        
        
        
        
        const req = getMockReq({
            params: { 
            id: newWishlist.id,
  
           },

           body:{
            itemId:newItem.id
           }
          })


      
          const res= httpMocks.createResponse();
      
          const newItemToWishlistController=await itemToWishlistController.createItemToWishlist(req, res)
          const responseItemToWishlistController = JSON.parse(res._getData());
          
          expect(responseItemToWishlistController).toStrictEqual( {
            "id": responseItemToWishlistController.id,
            "wishlistId":newItemToWishlist.wishlistId,
            "itemId": newItemToWishlist.itemId,
            "createdAt": responseItemToWishlistController.createdAt,
            "updatedAt": responseItemToWishlistController.updatedAt,
        })
           const deleteItemToWishlist= await itemToWishlistServices.deleteItemFromWishlist(newWishlist.id, newItem.id)
           const deleteWishlist=await wishlistServices.deleteWishlist(newWishlist.id)
           const deleteItem=await itemService.deleteItem(newItem.id)
          
    });


     
    test('Get All Wishlist Items', async () => {
        const newItem1= await itemService.createItem("Item1", '6e53024f-d078-43d0-b89e-1de0a7db2bc3', 'www.altex.ro', 'item description for the item 1');
        const newItem2= await itemService.createItem("Item1", '6e53024f-d078-43d0-b89e-1de0a7db2bc3', 'www.altex.ro', 'item description for the item 1');
        const newWishlist1=await wishlistServices.createWishlist('6e53024f-d078-43d0-b89e-1de0a7db2bc3', 'wishlist1', 'wishlist1Description');
        const newItemToWishlist=await itemToWishlistServices.createItemToWishlist(newWishlist1.id, newItem1.id)
        const newItemToWishlist2=await itemToWishlistServices.createItemToWishlist(newWishlist1.id, newItem2.id)
      

        const req = getMockReq({
            
            params: { wishlistId:newWishlist1.id},
          })
      
          const res= httpMocks.createResponse();

          const result=await itemToWishlistServices.getAllWishlistItems(newWishlist1.id)

    let wishlistAllItems=[];

    for(let i=0;i<result.length;i++){
        const item=await itemService.getItem(result[i].itemId)
        let wishlistAllItem = 
            {
              "id": result[i].id,
              "wishlistId": result[i].wishlistId,
              "itemId": result[i].itemId,
              "createdAt": result[i].createdAt,
              "updatedAt": result[i].updatedAt,
              "items": {
                "id": item.id,
                "userId": item.userId,
                "itemName": item.itemName,
                "itemLink": item.itemLink,
                "itemDescription": item.itemDescription,
                "status": item.status
              }
            }
        
          
        wishlistAllItems.push(wishlistAllItem)
    

    }

      
          const newItemToWishlistController=await itemToWishlistController.getWishlistAllItems(req, res)
          const responseItemToWishlistController = JSON.parse(res._getData());
          
          expect(responseItemToWishlistController.length).toStrictEqual(wishlistAllItems.length)
   
         
    });
    
 
     test('Deleting an Item From Wishlist', async () => {
       
        const newItem= await itemService.createItem("Item1", '6e53024f-d078-43d0-b89e-1de0a7db2bc3', 'www.altex.ro', 'item description for the item 1');
        const newWishlist=await wishlistServices.createWishlist('6e53024f-d078-43d0-b89e-1de0a7db2bc3', 'wishlist1', 'wishlist1Description');
        const newItemToWishlist=await itemToWishlistServices.createItemToWishlist(newWishlist.id, newItem.id)
        
        
        const req = getMockReq({
            params: { id: newWishlist.id,
                      itemId:newItem.id
                    },
          })
      
          const res= httpMocks.createResponse();


          const newItemToWishlistController=await itemToWishlistController.deleteItemFromWishlist(req, res)
          //const responseItemToWishlistController = JSON.parse(res._getData());


          expect(res._getData()).toStrictEqual('Item deleted from your WishList')
   
      

    });

      test('Deleting a wrong item from wishlist', async () => {

        const newItem= await itemService.createItem("Item1", '6e53024f-d078-43d0-b89e-1de0a7db2bc3', 'www.altex.ro', 'item description for the item 1');
        const newWishlist=await wishlistServices.createWishlist('6e53024f-d078-43d0-b89e-1de0a7db2bc3', 'wishlist1', 'wishlist1Description');
        const newItemToWishlist=await itemToWishlistServices.createItemToWishlist(newWishlist.id, newItem.id)
        
        
        const req = getMockReq({
            params: { id: '00000',
                      itemId:'00000'
                    },
          })
      

          
        const { res, next } = getMockRes({
        })

        
          const newItemToWishlistController=await itemToWishlistController.deleteItemFromWishlist(req, res,next)
 
        expect(next).toBeCalled() 


    }); 
    
    
    


     


 

 
});  