import wishlistServices from "../services/wishlist.js";

const getAllWishlists = async (req, res, next) => {
    try {
        const allWishlists=await wishlistServices.getAllWishlists(req.auth.userId);
        if(allWishlists.length==0){
          res.send("You don't have any wishlists added!")
        }
        else {
          res.json(allWishlists);
        }
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
  
      const response = await wishlistServices.updateWishlist(req.params.id, {
        userId: req?.auth?.userId || wishlist.userId,
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


  const getAllWishlistPagination = async (req, res, next) => {
    try {
      if(req.query.page1>=1 && req.query.limitPage>=1 && req.query.page1!=null && req.query.limitPage!=null){
      const wishlists=await wishlistServices.getAllWishlistPagination(req.auth.userId, req.query.page1, req.query.limitPage)
      res.json(wishlists)
      }
      else if(req.query.page1<=0 || req.query.limitPage<=0){
        
        res.send("Wrong pages format")
      }
      
      else if(req.query.page1==null && req.query.limitPage==null){
        next();
      }
      else if (req.query.page1==null || req.qeury.limitPage==null){
        res.send("You need to introduce the first page and the limit page")
      }
  
   
     
  
    } catch (err) {
        next(err);
    }
  
  
  };
  



export default {createWishlist, updateWishlist, getAllWishlists, deleteWishlist, getAllWishlistPagination}