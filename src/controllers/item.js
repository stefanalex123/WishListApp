import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

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
      const items=await itemService.getAllItems(req.auth.userId);
      if(items.length==0){
        res.send("You don't have any items added!")
      }
      else{
      res.send(items)
      }
  } catch (err) {
      next(err);
  }
};



const getAllItemsPagination = async (req, res, next) => {
  try {
    if(req.query.page1>=1 && req.query.limitPage>=1 && req.query.page1!=null && req.query.limitPage!=null){
    const items=await itemService.getAllItemsPagination(req.auth.userId, req.query.page1, req.query.limitPage)
    res.json(items)
    }
    else if(req.query.page1<=0 || req.query.limitPage<=0){
      
      res.send("Wrong pages format")
    }
    
    else if(req.query.page1==null && req.query.limitPage==null){
      next();
    }
    else if (req.query.page1==null || req.query.limitPage==null){
      res.send("You need to introduce the firs page and the limit page")
    }

 
   

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
        itemName: req?.body?.itemName || item.itemTitle,
        itemLink: req?.body?.itemLink || item.itemLink,
        itemDescription:req?.body?.itemDescription || item.itemDescription,
      });
  
      res.json(response);
    } catch (err) {
      console.error(`Error while updating item`);
      next(err);
    }
  };









export default  {createItem, updateItem, getAllItems, getItem, deleteItem, getAllItemsPagination}



