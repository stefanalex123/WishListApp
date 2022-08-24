import itemtowishlistservices from "../services/itemtowishlist.js";
import wishlist from "./wishlist.js";
import itemService from "../services/item.js"
import item from "./item.js";
import wishlistServices from "../services/wishlist.js"


const updateitemtowishlist = async (req, res, next) => {
    try {
      const itemtowishlist = await itemtowishlistservices.getitemtowishlist(req.params.id, req.params.itemid);
      if (!itemtowishlist) {
        throw { message: "Item not found in wishlist" };
      }
      const response = await itemtowishlistservices.updateitemtowishlist(itemtowishlist[0].id, {
        itemid:req.body.itemid || itemtowishlist.itemid,
         updatedat: new Date(),
      });
      res.json("Item Updated");
    } catch (err) {
      console.error(`Error while updating Item in the Wishlist`);
      next(err);
    }
  };



const deleteitemfromwhishlist = async (req, res, next) => {
    try {
        await itemtowishlistservices.deleteitemfromshishlist(req.params.id,req.params.itemid);
        //Daca stergem si ramane wishlistul gol schimbam statusul
        const wishlist= await wishlistServices.getWishList(req.params.id);
        if(wishlist.wishlistnritems==0){
          
        await wishlistServices.updateWishList(req.params.id, {
        userid: wishlist.userid,
        wishlistname: wishlist.wishlistname,
        wishlistdescription: wishlist.wishlistdescription,
        status:"UNAVAILABLE",
        wishlistnritems:wishlist.wishlistnritems-1,
        updatedAt:new Date()
  });
}
else {
  await wishlistServices.updateWishList(req.params.id, {
    userid: wishlist.userid,
    wishlistname: wishlist.wishlistname,
    wishlistdescription: wishlist.wishlistdescription,
    status:"Unavailable, add at least one item to it",
    wishlistnritems:wishlist.wishlistnritems-1,
    updatedAt:new Date()
});

}


        res.send("Item deleted from your WishList");
    } catch (err) {
        next(err);
    }
  };



const getwishlistallitems = async (req, res, next) => {
    try {
        var wishlistallitems=await itemtowishlistservices.getallwishlistItems(req.params.wishlistid);
        res.json(wishlistallitems)
    } catch (err) {
        next(err);
    }
  };


const createitemtowishlist = async (req,res,next) => {
    try{
        const newitemtowishlist= await itemtowishlistservices.createitemtowishlist(req.params.id, req.body.itemid)
        //Am adaugat item in wishlist, acuma facem update la statusul din wihhlist (available)
        const wishlist= await wishlistServices.getWishList(req.params.id);
        await wishlistServices.updateWishList(req.params.id, {
        userid: wishlist.userid,
        wishlistname: wishlist.wishlistname,
        wishlistdescription: wishlist.wishlistdescription,
        status:"AVAILABLE",
        wishlistnritems:wishlist.wishlistnritems+1,
        updatedAt:new Date()
  });




        res.json(newitemtowishlist);
    } catch (err){
        next(err);
    }

};

export default {createitemtowishlist, getwishlistallitems, deleteitemfromwhishlist, updateitemtowishlist}
