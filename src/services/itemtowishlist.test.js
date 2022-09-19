import e from "express";
import randomEmail from "random-email";
import adressServices from "../services/adress.js"
import item from "../services/item.js";
import itemServices from "../services/item.js"
import userProfileServices from "../services/userprofile.js"
import wishlistServices from "../services/wishlist.js"
import itemtowishlistServices from "../services/itemtowishlist.js"

import radnomEmail from 'random-email'
import itemtowishlist from "../services/itemtowishlist.js";
describe ('Item To Wishlist Services',  ()=> {


    test('Create Item To Wishlist', async () => {
   
        
        const newItem= await itemServices.createItem("Item1", '6e53024f-d078-43d0-b89e-1de0a7db2bc3', 'www.altex.ro', 'item description for the item 1');
        const newWishlist=await wishlistServices.createWishlist('6e53024f-d078-43d0-b89e-1de0a7db2bc3', 'wishlist1', 'wishlist1Description');
        const newItemToWishlist=await itemtowishlistServices.createItemToWishlist(newWishlist.id, newItem.id)
    
        
          expect(newItemToWishlist).toStrictEqual(
            
            {
                "id": newItemToWishlist.id,
                "wishlistId":newItemToWishlist.wishlistId,
                "itemId": newItemToWishlist.itemId,
                "createdAt": newItemToWishlist.createdAt,
                "updatedAt": newItemToWishlist.updatedAt,
            }
        
          )
    
          const deleteItemToWishlist=await itemtowishlist.deleteItemFromWishlist(newWishlist.id, newItem.id)
          const deleteItem=await itemServices.deleteItem(newItem.id)
          const deleteWishlist=await wishlistServices.deleteWishlist(newWishlist.id)
    
    });

    test('Delete Item To Wishlist', async () => {
   
        
        const newItem= await itemServices.createItem("Item1", '6e53024f-d078-43d0-b89e-1de0a7db2bc3', 'www.altex.ro', 'item description for the item 1');
        const newWishlist=await wishlistServices.createWishlist('6e53024f-d078-43d0-b89e-1de0a7db2bc3', 'wishlist1', 'wishlist1Description');
        const newItemToWishlist=await itemtowishlistServices.createItemToWishlist(newWishlist.id, newItem.id)
        const deleteItemToWishlist=await itemtowishlist.deleteItemFromWishlist(newWishlist.id, newItem.id)
        
          expect(deleteItemToWishlist).toStrictEqual(
            
            {
                "id": newItemToWishlist.id,
                "wishlistId":newItemToWishlist.wishlistId,
                "itemId": newItemToWishlist.itemId,
                "createdAt": newItemToWishlist.createdAt,
                "updatedAt": newItemToWishlist.updatedAt,
            }
        
          )
    
          //const deleteItemToWishlist2=await itemtowishlist.deleteItemFromWishlist(newWishlist.id, newItem.id)
          const deleteItem=await itemServices.deleteItem(newItem.id)
          
    
    });
    

    
      test('Get Item To Wishlist', async () => {
   
        
    const newItem= await itemServices.createItem("Item1", '6e53024f-d078-43d0-b89e-1de0a7db2bc3', 'www.altex.ro', 'item description for the item 1');
    const newWishlist=await wishlistServices.createWishlist('6e53024f-d078-43d0-b89e-1de0a7db2bc3', 'wishlist1', 'wishlist1Description');
    const newItemToWishlist=await itemtowishlistServices.createItemToWishlist(newWishlist.id, newItem.id)

    const itemToWishlist=await itemtowishlistServices.getItemToWishlist(newWishlist.id, newItem.id)
    
      expect(itemToWishlist).toStrictEqual(
        [
        {
            "id": newItemToWishlist.id,
            "wishlistId":newItemToWishlist.wishlistId,
            "itemId": newItemToWishlist.itemId,
            "createdAt": newItemToWishlist.createdAt,
            "updatedAt": newItemToWishlist.updatedAt,
        }
    ]
      )

      const deleteItemToWishlist=await itemtowishlist.deleteItemFromWishlist(newWishlist.id, newItem.id)
      const deleteItem=await itemServices.deleteItem(newItem.id)
      const deleteWishlist=await wishlistServices.deleteWishlist(newWishlist.id)

});




  test('getting all Wishlist Items', async () => {
   
   
    const newItem1= await itemServices.createItem("Item1", '6e53024f-d078-43d0-b89e-1de0a7db2bc3', 'www.altex.ro', 'item description for the item 1');
    const newItem2= await itemServices.createItem("Item2", '6e53024f-d078-43d0-b89e-1de0a7db2bc3', 'www.altex.ro', 'item description for the item 2');
    const newWishlist=await wishlistServices.createWishlist('6e53024f-d078-43d0-b89e-1de0a7db2bc3', 'wishlist1', 'wishlist1Description');
    const newItemToWishlist1=await itemtowishlistServices.createItemToWishlist(newWishlist.id, newItem1.id)
    const newItemToWishlist2=await itemtowishlistServices.createItemToWishlist(newWishlist.id, newItem2.id)


    const result=await itemtowishlistServices.getAllWishlistItems(newWishlist.id)

    let wishlistAllItems=[];

    for(let i=0;i<result.length;i++){
    const item=await itemServices.getItem(result[i].itemId)
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


    expect(result).toStrictEqual(wishlistAllItems)

    
    const deleteItemToWishlist1=await itemtowishlistServices.deleteItemFromWishlist(newWishlist.id, newItem1.id)
    const deleteItemToWishlist2=await itemtowishlistServices.deleteItemFromWishlist(newWishlist.id, newItem2.id)
    const deleteWishlist=await wishlistServices.deleteWishlist(newWishlist.id)
    const deleteItem1=await itemServices.deleteItem(newItem1.id)
    const deleteItem2=await itemServices.deleteItem(newItem2.id)


});



test('Update Item In Wishlist', async () => {
   
    const newItem1= await itemServices.createItem("Item1", '6e53024f-d078-43d0-b89e-1de0a7db2bc3', 'www.altex.ro', 'item description for the item 1');
    const newItem2= await itemServices.createItem("Item2", '6e53024f-d078-43d0-b89e-1de0a7db2bc3', 'www.altex.ro', 'item description for the item 2');
    const newWishlist=await wishlistServices.createWishlist('6e53024f-d078-43d0-b89e-1de0a7db2bc3', 'wishlist1', 'wishlist1Description');
    const newItemToWishlist=await itemtowishlistServices.createItemToWishlist(newWishlist.id, newItem1.id)
   
    const result=await itemtowishlistServices.updateItemToWishlist(newItemToWishlist.id,
        {
            itemId:newItem2.id,
            updatedAt: new Date(),
        }
    )
    
    expect(result).toStrictEqual(
        {
            "id": newItemToWishlist.id,
            "wishlistId":newItemToWishlist.wishlistId,
            "itemId": newItem2.id,
            "createdAt": newItemToWishlist.createdAt,
            "updatedAt": result.updatedAt,  
        }
    )

    const deleteItemToWishlist1=await itemtowishlistServices.deleteItemFromWishlist(newWishlist.id, newItem2.id)
    const deleteWishlist=await wishlistServices.deleteWishlist(newWishlist.id)
    const deleteItem1=await itemServices.deleteItem(newItem1.id)
    const deleteItem2=await itemServices.deleteItem(newItem2.id)
   


});  


});  
