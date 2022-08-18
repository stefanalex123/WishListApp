import itemService from "../services/item.js"


const deleteItem = async (req, res, next) => {
  try {
      await itemService.deleteItem(req.params.id);
      res.send("Item deleted");
  } catch (err) {
      next(err);
  }
};

const getAllItems = async (req, res, next) => {
  try {
      res.json(await itemService.geAllItems(req.auth.userid));
  } catch (err) {
      next(err);
  }
};

const getItem = async (req,res,next)=>{
  try {
    res.json(await itemService.getItem(req.body.ItemName));
  } catch (err){
    next(err);
  }
};



const createItem = async (req,res,next) => {
    try{
        const newItem= await itemService.createItem(req.body.ItemName, req.auth.userid, 
        req.body.ItemLink, req.body.ItemDescription)

        res.json(newItem);

    } catch (err){
        next(err);
    }

};

const updateItem = async (req, res, next) => {
    try {
    
  
      const item = await itemService.getItem(req.params.id);
  
      if (!item) {
        throw { message: "Item not found" };
      }
  
      const response = await itemService.updateItem(req.params.id, {
        userid: req.auth.userid || item.userid,
        itemtitle: req?.body?.ItemTitle || item.itemtitle,
        itemlink: req?.body?.ItemLink || item.itemlink,
        itemdescription:req?.body?.ItemDescription || item.itemdescription,
      });
  
      res.json(response);
    } catch (err) {
      console.error(`Error while updating item`);
      next(err);
    }
  };









export default  {createItem, updateItem, getAllItems, getItem, deleteItem}



