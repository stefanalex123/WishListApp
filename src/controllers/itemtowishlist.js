import itemToWishlistServices from "../services/itemtowishlist.js";
import wishlist from "./wishlist.js";
import itemService from "../services/item.js";
import item from "./item.js";
import wishlistServices from "../services/wishlist.js";

const updateItemToWishlist = async (req, res, next) => {
    try {
      const itemToWishlist = await itemToWishlistServices.getItemToWishlist(req.params.id, req.params.itemId);
      if (!itemToWishlist) {
        throw { message: "Item not found in wishlist" };
      }
      const response = await itemToWishlistServices.updateItemToWishlist(itemToWishlist[0].id, {
        itemId:req.body.itemId || itemToWishlist.itemId,
         updatedAt: new Date(),
      });
      res.json("Item Updated");
    } catch (err) {
      console.error(`Error while updating Item in the Wishlist`);
      next(err);
    }
  };



const deleteItemFromWishlist = async (req, res, next) => {
    try {
        await itemToWishlistServices.deleteItemFromWishlist(req.params.id,req.params.itemId);
        //Daca stergem si ramane wishlistul gol schimbam statusul
        const wishlist= await wishlistServices.getWishlist(req.params.id);
        if(wishlist.wishlistNrItems==1){
          
        await wishlistServices.updateWishlist(req.params.id, {
        userId: wishlist.userId,
        wishlistName: wishlist.wishlistName,
        wishlistDescription: wishlist.wishlistDescription,
        status:"UNAVAILABLE",
        wishlistNrItems:wishlist.wishlistNrItems-1,
        updatedAt:new Date()
  });
}
else {
  await wishlistServices.updateWishlist(req.params.id, {
    userId: wishlist.userId,
    wishlistName: wishlist.wishlistName,
    wishlistDescription: wishlist.wishlistDescription,
    status:"AVAILABLE",
    wishlistNrItems:wishlist.wishlistNrItems-1,
    updatedAt:new Date()
});

}


        res.send("Item deleted from your WishList");
    } catch (err) {
        next(err);
    }
  };



const getWishlistAllItems = async (req, res, next) => {
    try {
        var wishlistAllItems=await itemToWishlistServices.getAllWishlistItems(req.params.wishlistId);
        res.json(wishlistAllItems)
    } catch (err) {
        next(err);
    }
  };



const createItemToWishlist = async (req,res,next) => {
    try{
        const newItemToWishlist= await itemToWishlistServices.createItemToWishlist(req.params.id, req.body.itemId)
        //Am adaugat item in wishlist, acuma facem update la statusul din wihhlist (available)
        const wishlist= await wishlistServices.getWishlist(req.params.id);
        await wishlistServices.updateWishlist(req.params.id, {
        userId: wishlist.userId,
        wishlistName: wishlist.wishlistName,
        wishlistDescription: wishlist.wishlistDescription,
        status:"AVAILABLE",
        wishlistNrItems:wishlist.wishlistNrItems+1,
        updatedAt:new Date()
  });




        res.json(newItemToWishlist);
    } catch (err){
        next(err);
    }

};

export default {createItemToWishlist, getWishlistAllItems, deleteItemFromWishlist, updateItemToWishlist}
