import itemservice from "../services/item.js"


const deleteitem = async (req, res, next) => {
  try {
      await itemservice.deleteitem(req.params.id);
      res.send("Item deleted");
  } catch (err) {
      next(err);
  }
};

const getallitems = async (req, res, next) => {
  try {
      res.json(await itemservice.getallitems(req.auth.userid));
  } catch (err) {
      next(err);
  }
};

const getitem = async (req,res,next)=>{
  try {
    res.json(await itemservice.getitem(req.body.itemtitle));
  } catch (err){
    next(err);
  }
};



const createitem = async (req,res,next) => {
    try{
        const newitem= await itemservice.createitem(req.body.itemtitle, req.auth.userid, 
        req.body.itemlink, req.body.itemdescription)

        res.json(newitem);

    } catch (err){
        next(err);
    }

};

const updateitem = async (req, res, next) => {
    try {
    
  
      const item = await itemservice.getitem(req.params.id);
  
      if (!item) {
        throw { message: "Item not found" };
      }
  
      const response = await itemservice.updateitem(req.params.id, {
        userid: req.auth.userid || item.userid,
        itemtitle: req?.body?.itemtitle || item.itemtitle,
        itemlink: req?.body?.itemlink || item.itemlink,
        itemdescription:req?.body?.itemdescription || item.itemdescription,
      });
  
      res.json(response);
    } catch (err) {
      console.error(`Error while updating item`);
      next(err);
    }
  };









export default  {createitem, updateitem, getallitems, getitem, deleteitem}



