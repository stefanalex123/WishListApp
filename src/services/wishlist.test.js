import e from "express";
import adressServices from "../services/adress.js"
import item from "../services/item.js";
import itemServices from "../services/item.js"
import wishlist from "../services/wishlist.js";
import wishlistServices from "../services/wishlist.js"



describe ('Wishlist Services',  ()=> {

    
      test('Getting an Wishlist', async () => {
   
    
    const newWishlist= await wishlistServices.createWishlist('6e53024f-d078-43d0-b89e-1de0a7db2bc3', 'wishlist1', 'wishlist description wishlist 1');


    const wishlist =await wishlistServices.getWishlist(newWishlist.id)
    
      expect(wishlist).toStrictEqual(
        {
            "id": newWishlist.id,
            "userId":newWishlist.userId,
            "wishlistName":newWishlist.wishlistName,
            "wishlistDescription": newWishlist.wishlistDescription,
            "status":newWishlist.status,
            "wishlistNrItems":newWishlist.wishlistNrItems,
            "createdAt":newWishlist.createdAt,
            "updatedAt":newWishlist.updatedAt,
        }

      )
      const deleteWishlist=await wishlistServices.deleteWishlist(newWishlist.id)
});






 test('getting all Wishlists', async () => {
   
    const newWishlist1= await wishlistServices.createWishlist('6e53024f-d078-43d0-b89e-1de0a7db2bc3', 'wishlist1', 'wishlist description wishlist 1');
    const newWishlist2= await wishlistServices.createWishlist('6e53024f-d078-43d0-b89e-1de0a7db2bc3', 'wishlist2', 'wishlist description wishlist 2');
    
    const result=await wishlistServices.getAllWishlists('6e53024f-d078-43d0-b89e-1de0a7db2bc3')

    let wishlists=[];

    for(let i=0;i<result.length;i++){
        let wishlist = 
            {
                "id": result[i].id,
                "userId":result[i].userId,
                "wishlistName": result[i].wishlistName,
                "wishlistDescription": result[i].wishlistDescription,
                "status":result[i].status,
                "wishlistNrItems":result[i].wishlistNrItems,
                "createdAt":result[i].createdAt,
                "updatedAt":result[i].updatedAt,
            }
        wishlists.push(wishlist)

    }


    expect(result).toStrictEqual(wishlists)

    const deleteWishlist1=await wishlistServices.deleteWishlist(newWishlist1.id)
    const deleteWishlist2=await wishlistServices.deleteWishlist(newWishlist2.id)
});



 


  test('Update Wishlist', async () => {
    const newWishlist= await wishlistServices.createWishlist('6e53024f-d078-43d0-b89e-1de0a7db2bc3', 'wishlist1', 'wishlist description wishlist 1');

   
    const result=await wishlistServices.updateWishlist(newWishlist.id,
        {
            "id": newWishlist.id,
            "userId":newWishlist.userId,
            "wishlistName": newWishlist.wishlistName,
            "wishlistDescription": 'new description after update',
            "status":newWishlist.status,
            "wishlistNrItems":newWishlist.wishlistNrItems,
            "createdAt":newWishlist.createdAt,
            "updatedAt":newWishlist.updatedAt,
        }
    )

    
    expect(result).toStrictEqual(
        {
            "id": result.id,
            "userId":result.userId,
            "wishlistName": result.wishlistName,
            "wishlistDescription": 'new description after update',
            "status":result.status,
            "wishlistNrItems":result.wishlistNrItems,
            "createdAt":result.createdAt,
            "updatedAt":result.updatedAt,
        }
    )

    const deleteWishlist=await wishlistServices.deleteWishlist(result.id) 


});    


/* 
 test('Delete Andress', async () => {
   
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



});      */


});  