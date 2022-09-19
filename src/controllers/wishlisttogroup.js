import wishlistToGroupServices from "../services/wishlisttogroup.js";



const updateWishlistToGroup = async (req, res, next) => {
    try {
      const wishlistToGroup = await wishlistToGroupServices.getWishlistToGroup(req.params.id, req.params.wishlistId);
      if (!wishlistToGroup) {
        throw { message: "Whislist not found in group" };
      }
      const response = await wishlistToGroupServices.updateWishlistToGroup(wishlistToGroup[0].id, {
        wishlistId:req.body.wishlistId,
        groupId:req.params.groupId,
        createdAt:wishlistToGroup[0].createdAt,
        updatedAt: new Date(),
      });
      res.json("Wishlist Updated");
    } catch (err) {
      console.error(`Error while updating Item in the Wishlist`);
      next(err);
    }
  };



const deleteWishlistToGroup = async (req, res, next) => {
    try {
        await wishlistToGroupServices.deleteWishlistToGroup(req.params.id,req.params.wishlistId);
        res.send("Wishlist deleted from your group");
    } catch (err) {
        next(err);
    }
  };



const getGroupAllWishlists = async (req, res, next) => {
    try {
        const groupAllWishlists=await wishlistToGroupServices.getAllWishlistToGroup(req.params.id);
        if(groupAllWishlists.length==0){
          res.send("There is no wishlist in this group!")
        }
        else{
        res.json(groupAllWishlists)
        }
    } catch (err) {
        next(err);
    }
  };


const createWishlistToGroup = async (req,res,next) => {
    try{
        const newWishlistToGroup= await wishlistToGroupServices.createWishlistToGroup(req.params.id, req.body.wishlistId)
        res.json(newWishlistToGroup);
    } catch (err){
        next(err);
    }

};

export default { getGroupAllWishlists  ,updateWishlistToGroup, deleteWishlistToGroup, getGroupAllWishlists, createWishlistToGroup}
