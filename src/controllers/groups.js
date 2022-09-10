import groupServices from "../services/groups.js";
import { PrismaClient } from "@prisma/client";
import userProfileService from "../services/userprofile.js";
import isLeapYear from "leap-year";
import notificationsServices from "../services/notifications.js"
import groupsinvitationsService from "../services/groupsinvitations.js";
const prisma = new PrismaClient();



const updateGroup = async (req, res, next) => {
    try {
    
      const group= await groupServices.getGroup(req.params.id);
  
      if (!group) {
        throw { message: "Group not found" };
      }
  
      const response = await groupServices.updateGroup(req.params.id, {
        groupTitle: req?.body?.groupTitle || group.groupTitle,
        groupDescription: req?.body?.groupDescription || group.groupDescription,
      });
      res.json(response);
    } catch (err) {
      console.error(`Error while updating Group`);
      next(err);
    }
}


const getAllGroupsWhereOwner = async (req, res, next) => {
    try {
        const allGroupsWhereUserOwner=await groupServices.getAllGroupsWhereOwner(req.auth.userId);
        if(allGroupsWhereUserOwner.length==0){
          res.send("You are not owner to any group!")
        }
        else {
          res.send(allGroupsWhereUserOwner)
        }
    } catch (err) {
        next(err);
    }
  };


const createGroup = async (req,res,next) => {
    try{
        const newGroup= await groupServices.createGroup(req.body.groupTitle, req.body.groupDescription, req.auth.userId)
        //We will create an invitation for the owner to be also recognized as the member fo the group
        const groupInvitation=await groupsinvitationsService.convertOwnerInMember(newGroup.id, req.auth.userId);

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