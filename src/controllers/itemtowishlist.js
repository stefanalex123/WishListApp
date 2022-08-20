import itemtowishlistServices from "../services/itemtowishlist.js";
import wishlist from "./wishlist.js";
import itemService from "../services/item.js"
import item from "./item.js";


const updateItemtoWishlist = async (req, res, next) => {
    try {
    
  
      const itemtowishlist = await itemtowishlistServices.getitemToWishlist(req.params.wishlistid, req.params.itemid);
  
      if (!itemtowishlist) {
        throw { message: "Item not found in wishlist" };
      }


      const response = await itemtowishlistServices.updateItemtoWishlist(itemtowishlist[0].id, {
        itemid:req.body.itemid || itemtowishlist.itemid,
         updatedAt: new Date(),
      });
      res.json("Item Updated");
    } catch (err) {
      console.error(`Error while updating Item in the Wishlist`);
      next(err);
    }
  };



const deleteItemFromWhishList = async (req, res, next) => {
    try {
        await itemtowishlistServices.deleteItemFromWhishList(req.params.id,req.params.itemid);
        res.send("Item deleted from your WishList");
    } catch (err) {
        next(err);
    }
  };



const getWishlistAllItems = async (req, res, next) => {
    try {
        var wishlistallitems=await itemtowishlistServices.getAllItemToWishList(req.params.id);
        res.json(wishlistallitems)
    } catch (err) {
        next(err);
    }
  };


const createItemtoWishlist = async (req,res,next) => {
    try{
        const newItemToWishlist= await itemtowishlistServices.createItemtoWishlist(req.params.id, req.body.itemid)
        res.json(newItemToWishlist);
    } catch (err){
        next(err);
    }

};

export default {createItemtoWishlist, getWishlistAllItems, deleteItemFromWhishList, updateItemtoWishlist}
