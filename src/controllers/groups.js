import groupServices from "../services/groups.js"


const updateGroup = async (req, res, next) => {
    try {
    
  
      const group= await groupServices.getGroup(req.params.id);
  
      if (!group) {
        throw { message: "Group not found" };
      }
  
      const response = await groupServices.updateGroup(req.params.id, {
        grouptitle: req?.body?.grouptitle || group.grouptitle,
        groupdescription: req?.body?.groupdescription || group.groupdescription,
      });
      res.json(response);
    } catch (err) {
      console.error(`Error while updating Group`);
      next(err);
    }
}


const getAllGroupsWhereOwner = async (req, res, next) => {
    try {
        res.json(await groupServices.getAllGroupsWhereOwner(req.auth.userid));
    } catch (err) {
        next(err);
    }
  };


const createGroup = async (req,res,next) => {
    try{
        const newGroup= await groupServices.creategroup(req.body.grouptitle, req.body.groupdescription, req.auth.userid)
        res.json(newGroup);
    } catch (err){
        next(err);
    }
};

const deleteGroup = async (req, res, next) => {
    try {
        await groupServices.deleteGroup(req.params.id);
        res.send("Group deleted");
    } catch (err) {
        next(err);
    }
  };

export default {createGroup, getAllGroupsWhereOwner, updateGroup, deleteGroup}