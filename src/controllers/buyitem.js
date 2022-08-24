import buyitemservices from "../services/buyitem.js"
import itemservice from "../services/item.js"
import userprofileService from "../services/userprofile.js"

const getallbuyersforitem= async (req, res, next) => {
  try {
      var allbuyersforitem=await buyitemservices.getbuyersforitem(req.params.itemid);
      res.json(allbuyersforitem)
  } catch (err) {
      next(err);
  }
};

  const getallcontributioninvitationforuserasked = async (req, res, next) => {
    try {
        var allcontributionsforuser=await contributioninvitationsServices.getallcontributioninvitationsforuser(req.auth.userid);
        res.json(allcontributionsforuser)
    } catch (err) {
        next(err);
    }
  };

const createbuyitem = async (req,res,next) => {
    try{
        const newbuyitem= await buyitemservices.createbuyitem(req.auth.userid, req.params.itemid)
        // modificam statusul itemului in indisponibil
        try {
    
            const item = await itemservice.getitem(req.params.itemid);
        
            if (!item) {
              throw { message: "Item not found" };
            }
        
            const response = await itemservice.updateitem(req.params.itemid, {
              userid: item.userid,
              itemtitle: item.itemtitle,
              itemlink: item.itemlink,
              itemdescription:item.itemdescription,
              status:"INDISPONIBILE"
            });
          } catch (err) {
            console.error(`Error while updating item`);
            next(err);
          }

          // Trimitem o notificare catre proprietarul itemului ca a fost cumparat
        const item= await itemservice.getitem(req.params.itemid)
        const user=await userprofileService.getUserProfile(req.auth.userid) 
        const newnotificaton= await notificationsServices.createnotification(
        "Itemul pe care il detii " + item.itemname + " a fost cumparat de  " + user.nickname+ " " , Date.now(), item.userid
        )
        res.json(newbuyitem);

    } catch (err){
        next(err);
    }

};

export default {createbuyitem, getallbuyersforitem}
