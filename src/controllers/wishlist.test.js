import e, { response } from "express";
import adressServices from "../services/adress.js"
import adressController from "../controllers/adress.js"
import httpMocks from 'node-mocks-http'

import { getMockReq, getMockRes } from '@jest-mock/express'
import adress from "../services/adress.js";
import itemService from "../services/item.js"
import itemController from "../controllers/item.js"
import wishlistServices from "../services/wishlist.js"
import wishlistController from "../controllers/wishlist.js"
describe ('Wishlist Controller',  ()=> {



    test('Creating an Wishlist', async () => {

        const newWishlist= await wishlistServices.createWishlist('6e53024f-d078-43d0-b89e-1de0a7db2bc3', 'wishlist1', 'wishlist description wishlist 1');


        const req = getMockReq({
            body: { 
            wishlistName: newWishlist.wishlistName,
            wishlistDescription: newWishlist.wishlistDescription,
           },
            auth: { userId: '6e53024f-d078-43d0-b89e-1de0a7db2bc3'},
          })
      
          const res= httpMocks.createResponse();
      
          const newWishlistController=await wishlistController.createWishlist(req, res)
          const responseWishlistController = JSON.parse(res._getData());
          
          expect(responseWishlistController).toStrictEqual( {
            "id": responseWishlistController.id,
            "userId":newWishlist.userId,
            "wishlistName":newWishlist.wishlistName,
            "wishlistDescription": newWishlist.wishlistDescription,
            "status":newWishlist.status,
            "wishlistNrItems":newWishlist.wishlistNrItems,
            "createdAt":responseWishlistController.createdAt,
            "updatedAt":responseWishlistController.updatedAt,
        })
   
      
          const deleteWishlist=await wishlistServices.deleteWishlist(newWishlist.id)
    });


    
     

     test('Deleting an Wishlist', async () => {
       
        const newWishlist= await wishlistServices.createWishlist('6e53024f-d078-43d0-b89e-1de0a7db2bc3', 'wishlist1', 'wishlist description wishlist 1');
        
        const req = getMockReq({
            params: { id: newWishlist.id},
          })
      
          const res= httpMocks.createResponse();
      
          const newItemController=await wishlistController.deleteWishlist(req,res)
          //const responseAdressController = JSON.parse(res._getData());
          
          expect(res._getData()).toStrictEqual('Wishlist deleted')
   
      

    });

      test('Deleting a wrong Wishlist', async () => {

        const newWishlist= await wishlistServices.createWishlist('6e53024f-d078-43d0-b89e-1de0a7db2bc3', 'wishlist1', 'wishlist description wishlist 1');
        const req = getMockReq({
            params: { 
            id: '00000',
           },
       
          })
      

          
        const { res, next } = getMockRes({
        })
        const result=await wishlistController.deleteWishlist(req, res, next)
 
        expect(next).toBeCalled()


    }); 
    
    
    

    
    




     test('getting all Wishlist', async () => {
   

    const newWishlist1= await wishlistServices.createWishlist('6e53024f-d078-43d0-b89e-1de0a7db2bc3', 'wishlist1', 'wishlist description wishlist 1');
    const newWishlist2= await wishlistServices.createWishlist('6e53024f-d078-43d0-b89e-1de0a7db2bc3', 'wishlist1', 'wishlist description wishlist 1');
    const result=await wishlistServices.getAllWishlists('6e53024f-d078-43d0-b89e-1de0a7db2bc3')
    //console.log(result.length);
let wishlists=[];

for(let i=0;i<result.length;i++){
    let wishlist = 
        [{
            "id": result[i].id,
            "userId":result[i].userId,
            "wishlistName":result[i].wishlistName,
            "wishlistDescription": result[i].wishlistDescription,
            "status":result[i].status,
            "wishlistNrItems":result[i].wishlistNrItems,
            "createdAt":result[i].createdAt,
            "updatedAt":result[i].updatedAt,
        }
    ]

    wishlists.push(wishlist)

}


    

        const req = getMockReq({
            auth: { userId: '6e53024f-d078-43d0-b89e-1de0a7db2bc3'},
          })

          const res= httpMocks.createResponse();
      
          const newWishlistController=await wishlistController.getAllWishlists(req,res)
          const responseWishlistController = JSON.parse(res._getData());
          //console.log(responseAdressController.length)
  
    

        expect(responseWishlistController.length).toStrictEqual(wishlists.length)

        const deleteWishlist1=await wishlistServices.deleteWishlist(newWishlist1.id)
        const deleteWishlist2=await wishlistServices.deleteWishlist(newWishlist2.id)
});



   test('Update Wishlist', async () => {
    const newWishlist= await wishlistServices.createWishlist('6e53024f-d078-43d0-b89e-1de0a7db2bc3', 'wishlist1', 'wishlist description wishlist 1');


    const req = getMockReq({
        params: { id: newWishlist.id},
       
      })

      const res= httpMocks.createResponse();
  
      const newWishlistController=await wishlistController.updateWishlist(req, res)
      const responseWishlistController = JSON.parse(res._getData());


      expect(responseWishlistController).toStrictEqual( {
        "id": responseWishlistController.id,
        "userId":newWishlist.userId,
        "wishlistName":newWishlist.wishlistName,
        "wishlistDescription": newWishlist.wishlistDescription,
        "status":newWishlist.status,
        "wishlistNrItems":newWishlist.wishlistNrItems,
        "createdAt":responseWishlistController.createdAt,
        "updatedAt":responseWishlistController.updatedAt,
    })
       

    const deleteWishlist=await wishlistServices.deleteWishlist(newWishlist.id) 


});    
    
 

 
});  