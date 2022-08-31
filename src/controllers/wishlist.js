import wishlistServices from "../services/wishlist.js";

const getAllWishlists = async (req, res, next) => {
    try {
        res.json(await wishlistServices.getAllWishlists(req.auth.userId));
    } catch (err) {
        next(err);
    }
  };


const createWishlist = async (req,res,next) => {
    try{
        const newWishlist= await wishlistServices.createWishlist(req.auth.userId,req.body.wishlistName, req.body.wishlistDescription)
        res.json(newWishlist);
    } catch (err){
        next(err);
    }

};

const updateWishlist = async (req, res, next) => {
    try {
      const wishlist= await wishlistServices.getWishlist(req.params.id);
      if (!wishlist) {
        throw { message: "Wishlist not found" };
      }
  
      const response = await wishlistServices.updateWishList(req.params.id, {
        userId: req.auth.userId || wishlist.userId,
        wishlistName: req?.body?.wishlistName || wishlist.wishlistName,
        wishlistDescription: req?.body?.wishlistDescription || wishlist.wishlistDescription,
        status: wishlist.status,
        wishlistNrItems:wishlist.wishlistNrItems,
        updatedAt:new Date()
      });
  
      res.json(response);
    } catch (err) {
      console.error(`Error while updating WishList`);
      next(err);
    }
  };

  
const deleteWishlist = async (req, res, next) => {
    try {
        await wishlistServices.deleteWishlist(req.params.id);
        res.send("Wishlist deleted");
    } catch (err) {
        next(err);
    }
  };



export default {createWishlist, updateWishlist, getAllWishlists, deleteWishlist}