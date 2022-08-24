import groupservices from "../services/groups.js"


const updategroup = async (req, res, next) => {
    try {
    
      const group= await groupservices.getgroup(req.params.id);
  
      if (!group) {
        throw { message: "Group not found" };
      }
  
      const response = await groupservices.updategroup(req.params.id, {
        grouptitle: req?.body?.grouptitle || group.grouptitle,
        groupdescription: req?.body?.groupdescription || group.groupdescription,
      });
      res.json(response);
    } catch (err) {
      console.error(`Error while updating Group`);
      next(err);
    }
}


const getallgroupswhereowner = async (req, res, next) => {
    try {
        res.json(await groupservices.getallgroupswhereowner(req.auth.userid));
    } catch (err) {
        next(err);
    }
  };


const creategroup = async (req,res,next) => {
    try{
        const newGroup= await groupservices.creategroup(req.body.grouptitle, req.body.groupdescription, req.auth.userid)
        res.json(newGroup);
    } catch (err){
        next(err);
    }
};

const deletegroup = async (req, res, next) => {
    try {
        await groupservices.deletegroup(req.params.id);
        res.send("Group deleted");
    } catch (err) {
        next(err);
    }
  };

export default {creategroup, getallgroupswhereowner, updategroup, deletegroup}