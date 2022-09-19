import adressService from "../services/adress.js";

const deleteAdress = async (req, res, next) => {
    try {
        await adressService.deleteAdress(req.params.id);
        res.send("Adress deleted");
    } catch (err) {
        next(err);
    }
  };

const createAdress = async (req,res,next) => {
    try{
        const newAdress= await adressService.createAdress(req.auth.userId, req.body.country, req.body.city, req.body.street,
        req.body.flat, req.body.postalCode)

        res.json(newAdress);

    } catch (err){
        next(err);
    }



};


const updateAdress = async (req, res, next) => {
    try {
  
      const adress = await adressService.getAdress(req.params.id);
      console.log(adress)
  
      if (!adress) {
        throw { message: "Adress not found" };
      }
  
      const response = await adressService.updateAdress(req.params.id, {
        userId: req?.auth?.userId || adress.userId,
        country: req?.body?.country || adress.country,
        city: req?.body?.city || adress.city,
        street:req?.body?.street || adress.street,
        flat:req?.body?.flat || adress.flat,
        postalCode:req?.body?.postalCode || adress.postalCode,
      });
  
      res.json(response);
    } catch (err) {
      console.error(`Error while updating Adress`);
      next(err);
    }
  };

  const getAllAdresses = async (req, res, next) => {
    try {
        const adresses=await adressService.getAllAdresses(req.auth.userId);
        if(adresses.length==0){
          res.send("You don't have any adresses added!")
        }
        else {
          res.json(adresses)
        }
    } catch (err) {
        next(err);
    }
  };

export default {createAdress, updateAdress, getAllAdresses, deleteAdress}