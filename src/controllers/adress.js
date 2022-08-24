import adressservice from "../services/adress.js"

const deleteadress = async (req, res, next) => {
    try {
        await adressservice.deleteadress(req.params.id);
        res.send("Adress deleted");
    } catch (err) {
        next(err);
    }
  };

const createadress = async (req,res,next) => {
    try{
        const newadress= await adressservice.createadress(req.auth.userid, req.body.country, req.body.city, req.body.street,
        req.body.flat, req.body.postalcode)

        res.json(newadress);

    } catch (err){
        next(err);
    }

};

const updateadress = async (req, res, next) => {
    try {
  
      const adress = await adressservice.getadress(req.params.id);
  
      if (!adress) {
        throw { message: "Adress not found" };
      }
  
      const response = await adressservice.updateadress(req.params.id, {
        userid: req.auth.userid || adress.userid,
        country: req?.body?.country || adress.country,
        city: req?.body?.city || adress.city,
        street:req?.body?.street || adress.street,
        flat:req?.body?.flat || adress.flat,
        postalcode:req?.body?.postalcode || adress.postalcode,
      });
  
      res.json(response);
    } catch (err) {
      console.error(`Error while updating Adress`);
      next(err);
    }
  };

  const getalladresses = async (req, res, next) => {
    try {
        res.json(await adressservice.getalladresses(req.auth.userid));
    } catch (err) {
        next(err);
    }
  };

export default {createadress, updateadress, getalladresses, deleteadress}