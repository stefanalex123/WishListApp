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


const getAllMembersGroup = async (req, res, next) => {
  try {
      const allMemeberInGroup=await groupServices.getGroupAllMembers(req.params.id);
      res.send(allMemeberInGroup);
  } catch (err) {
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




  const mostPopularBuyer= async (req, res, next) =>{
    let mostPopularBuyers=[];
    try {
      const allMembers = await prisma.groupInvitations.findMany({
        where: {
        groupId:req.params.id,
        status:"ACCEPTED"
        },
      })

      let MaximumNumberOfItemsBoughtByUser=0;
      for(let i=0;i<allMembers.length;i++){
        const numberOfItemsBoughtByUser=await prisma.buyItem.findMany({
          where:{
            userBuyerId:allMembers[i].userInvitedId
          }
      })

    

        if(numberOfItemsBoughtByUser.length>=MaximumNumberOfItemsBoughtByUser){
          MaximumNumberOfItemsBoughtByUser=numberOfItemsBoughtByUser.length;
        }
      }

      console.log(MaximumNumberOfItemsBoughtByUser)

      for(let i=0;i<allMembers.length;i++){
        const numberOfItemsBoughtByUser=await prisma.buyItem.findMany({
          where:{
            userBuyerId:allMembers[i].userInvitedId
          }
      })

      console.log(numberOfItemsBoughtByUser)
      if(numberOfItemsBoughtByUser.length==MaximumNumberOfItemsBoughtByUser){

        for(let t=0;t<numberOfItemsBoughtByUser.length;t++){
           const itemsUserBought=await prisma.items.findMany({
              where:{
                id:numberOfItemsBoughtByUser[t].itemId
              }
        })

        let popularBuyer=[ { "MostPopularBuyerId":numberOfItemsBoughtByUser[0].userBuyerId,
                              "numberOfItemsBought":numberOfItemsBoughtByUser.length,
      }]
        for(let j=0;j<itemsUserBought.length;j++){
        let mostPopularBuyer = [
          
            {
              "MostPopularBuyerId":numberOfItemsBoughtByUser[0].userBuyerId,
              "numberOfItemsBought":numberOfItemsBoughtByUser.length,

              "itemsUserBought":[
                {
                  "itemId:": itemsUserBought[j].id,
                  "itemName": itemsUserBought[j].itemName,
                  "itemDescription":itemsUserBought[j].itemDescription,
                  "itemLink":itemsUserBought[j].itemLink,

                }
              ]
               
           }
        ]
        mostPopularBuyers.push(mostPopularBuyer);
      }

    }
  }
}

    if(MaximumNumberOfItemsBoughtByUser==0){
      res.send("Nobody bought any items!")
    }
    else {
      res.json(mostPopularBuyers);
    }

    } catch(err){
      next(err)
    }
  }



  
  const mostPopularContributer= async (req, res, next) =>{
    let mostPopularContributers=[];
    try {
      const allMembers = await prisma.groupInvitations.findMany({
        where: {
        groupId:req.params.id,
        status:"ACCEPTED"
        },
      })
      let maximumNumberOfItemsContributedByUser=0;
      for(let i=0;i<allMembers.length;i++){
        const numberOfItemsContributedByUser=await prisma.contributionInvitation.findMany({
          where:{
            userContributerId:allMembers[i].userInvitedId,
            status:"ACCEPTED"
          }
      })


      
        if(numberOfItemsContributedByUser.length>=maximumNumberOfItemsContributedByUser){
        maximumNumberOfItemsContributedByUser=numberOfItemsContributedByUser.length;
        }
      }

      for(let i=0;i<allMembers.length;i++){

        const numberOfItemsContributedByUser=await prisma.contributionInvitation.findMany({
          where:{
            userContributerId:allMembers[i].userInvitedId
          }
      })
      if(numberOfItemsContributedByUser.length==maximumNumberOfItemsContributedByUser){
        for(let t=0;t<numberOfItemsContributedByUser.length;t++){
        const itemsUserContributed=await prisma.items.findMany({
          where:{
            id:numberOfItemsContributedByUser[t].itemId
          }
       })


    
    for(let j=0;j<itemsUserContributed.length;j++){

        let mostPopularContributer= [
            {
              "mostPopularContributerId":numberOfItemsContributedByUser[0].userContributerId,
              "numberOfItemsUserContributed":numberOfItemsContributedByUser.length,
              "itemsUserContributed":[
                {
                  "itemId:": itemsUserContributed[j].id,
                  "itemName": itemsUserContributed[j].itemName,
                  "itemDescription":itemsUserContributed[j].itemDescription,
                  "itemLink":itemsUserContributed[j].itemLink,

                }
              ]

           }
        ]
        mostPopularContributers.push(mostPopularContributer);
      }
    }

    }
  }
    if(maximumNumberOfItemsContributedByUser==0){
      res.send("Nobody contributed to this item!")
    }
    else {
      res.json(mostPopularContributers);
    }
    
    } catch(err){
      next(err)
    }
  }


  

export default {createGroup, getAllGroupsWhereOwner, updateGroup, deleteGroup, mostPopularContributer, mostPopularBuyer, getAllMembersGroup}