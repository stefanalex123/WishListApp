import wishlisttogroupServices from "../services/wishlisttogroup.js"



const updatewishlisttogroup = async (req, res, next) => {
    try {
    
  
      const wishlisttogroup = await wishlisttogroupServices.getwishlisttogroup(req.params.id, req.params.wishlistid);
  
      if (!wishlisttogroup) {
        throw { message: "Whislist not found in group" };
      }


      const response = await wishlisttogroupServices.updatewishlisttogroup(itemtowishlist[0].id, {
        wishlistid:req.params.wishlistid,
        groupid:req.params.groupid,
        createdat:wishlisttogroup[0].createdAt,
        updatedAt: new Date(),
      });
      res.json("Item Updated");
    } catch (err) {
      console.error(`Error while updating Item in the Wishlist`);
      next(err);
    }
  };



const deletewishlistrogroup = async (req, res, next) => {
    try {
        await wishlisttogroupServices.deletewishlistrogroup(req.params.id,req.params.wishlistid);
        res.send("Wishlist deleted from your group");
    } catch (err) {
        next(err);
    }
  };



const getgroupallwishlists = async (req, res, next) => {
    try {
        var groupallwishlists=await wishlisttogroupServices.getAllwishlisttogroup(req.params.id);
        res.json(groupallwishlists)
    } catch (err) {
        next(err);
    }
  };


const createwishlisttogroup = async (req,res,next) => {
    try{
        const newwishlisttogroup= await wishlisttogroupServices.createwishlisttogroup(req.params.id, req.body.wishlistid)
        res.json(newwishlisttogroup);
    } catch (err){
        next(err);
    }

};

export default {updatewishlisttogroup, deletewishlistrogroup, getgroupallwishlists, createwishlisttogroup}
