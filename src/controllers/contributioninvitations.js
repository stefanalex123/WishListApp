import contributioninvitationsServices from "../services/contributioninvitation.js"

const getallcontributorsforitem= async (req, res, next) => {
  try {
      var allcontributorsforitem=await contributioninvitationsServices.getcontributorsforitem(req.params.itemid);
      res.json(allcontributorsforitem)
  } catch (err) {
      next(err);
  }
};





const updatecontributioninvitation = async (req, res, next) => {
    try {
    
  
      const contributioninvitation = await contributioninvitationsServices.getcontributioninvitation2(req.params.invitationid)
  
      if (!contributioninvitation) {
        throw { message: "Contribution Invitation Not Found" };
      }


      await contributioninvitationsServices.updatecontributioninvitation(req.params.invitationid, {
         status:req.body.status,
      });

      res.send("Ai acceptat cerea")
      
    } catch (err) {
      console.error(`Error while updating Invitation`);
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

  const createcontributioninvitation = async (req,res,next) => {
    try{
        const newcontributioninvitation= await contributioninvitationsServices.createcontributioninvitation(req.params.itemid, req.auth.userid, req.body.useraskedid)
        res.json(newcontributioninvitation);
    } catch (err){
        next(err);
    }

};


const detelecontributioninvitation = async (req, res, next) => {
    try {
        await contributioninvitationsServices.deletecontributioninvitation(req.params.itemid, req.auth.userid);
        res.send("Contribution Invitation deleted");
    } catch (err) {
        next(err);
    }
  };



  export default {getallcontributorsforitem   ,detelecontributioninvitation, getallcontributioninvitationforuserasked, createcontributioninvitation, updatecontributioninvitation}