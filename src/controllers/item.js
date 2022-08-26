import itemService from "../services/item.js";


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
      res.json(await itemService.getAllItems(req.auth.userId));
  } catch (err) {
      next(err);
  }
};

const getItem = async (req,res,next)=>{
  try {
    res.json(await itemService.getItem(req.params.id));
  } catch (err){
    next(err);
  }
};



const createItem = async (req,res,next) => {
    try{
        const newItem= await itemService.createItem(req.body.itemName, req.auth.userId, 
        req.body.itemLink, req.body.itemDescription)

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
        userId: req.auth.userId || item.userId,
        itemTitle: req?.body?.itemTitle || item.itemTitle,
        itemLink: req?.body?.itemLink || item.itemLink,
        itemDescription:req?.body?.itemDescription || item.itemDescription,
      });
  
      res.json(response);
    } catch (err) {
      console.error(`Error while updating item`);
      next(err);
    }
  };









export default  {createItem, updateItem, getAllItems, getItem, deleteItem}



