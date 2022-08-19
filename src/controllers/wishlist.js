import wishlistServices from "../services/wishlist.js"

const getAllWishlists = async (req, res, next) => {
    try {
        res.json(await wishlistServices.getAllWishlists(req.auth.userid));
    } catch (err) {
        next(err);
    }
  };


const createWishlist = async (req,res,next) => {
    try{
        const newWishList= await wishlistServices.createWishlist(req.auth.userid,req.body.wishlistname, req.body.wishlistdescription)

        res.json(newWishList);

    } catch (err){
        next(err);
    }

};

const updateWishlist = async (req, res, next) => {
    try {
    
  
      const wishlist= await wishlistServices.getWishList(req.params.id);
  
      if (!wishlist) {
        throw { message: "Wishlist not found" };
      }
  
      const response = await wishlistServices.updateWishList(req.params.id, {
        userid: req.auth.userid || wishlist.userid,
        wishlistname: req?.body?.wishlistname || wishlist.wishlistname,
        wishlistdescription: req?.body?.wishlistdescription || wishlist.wishlistdescription,
        status: wishlist.status,
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