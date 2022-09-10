import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();



const deleteGroupInvitation= async (groupId, userInvitedId) => {


    const groupInvitation = await prisma.groupInvitations.findMany({
      where: {
        groupId:groupId,
        userInvitedId:userInvitedId
      }
    })
  
    const groupInvitationDeleted = await prisma.groupInvitations.delete({
      where: {
        id:groupInvitation[0].id
      }
     
    })

    return groupInvitationDeleted

}
  

const getGroupInvitation= async (id) => {
    const groupInvitation = await prisma.groupInvitations.findUnique({
      where: {
      id:id
      }
    })
    return groupInvitation;
  };

  const getGroupInvitationById= async (id) => {
    const groupInvitation = await prisma.groupInvitations.findUnique({
      where: {
       id:id
      }
    })
    return groupInvitation;
  };



const createGroupInvitation= async (groupId ,userInvitedId) =>{
    const groupInvitation=await prisma.groupInvitations.create({
        data: {
            status:"PENDING",
            groupId:groupId,
            userInvitedId:userInvitedId
        }
    });
        return groupInvitation;
};

const convertOwnerInMember= async (groupId ,userInvitedId) =>{
  const groupInvitation=await prisma.groupInvitations.create({
      data: {
          status:"ACCEPTED",
          groupId:groupId,
          userInvitedId:userInvitedId
      }
  });
      return groupInvitation;
};

const getAllGroupInvitations= async (id) => {
    const allGroupInvitations = await prisma.groupInvitations.findMany({
      where: {
        groupId:id
      },
      include: {
       userProfile:true
           
    }
    })
    return allGroupInvitations;
  };

  const getAllInvitationsForUser= async (id) => {
    const allGroupInvitations = await prisma.groupInvitations.findMany({
      where: {
        userInvitedId:id
      },
      include: {
        group:true
      }
    })
    return allGroupInvitations;
  };

  const getAllInvitationsAcceptedForUser= async (id) => {
    const allGroupInvitationsAccepted = await prisma.groupInvitations.findMany({
      where: {
        userInvitedId:id,
        status:"ACCEPTED"
      },
      include: {
        group:true
      }
    })
    return allGroupInvitationsAccepted;
  };







  const updateGroupInvitation= async (id, groupInvitationInfo) => {

    const groupInvitationUpdated = await prisma.groupInvitations.update({
      where: {
        id:id
      },
      data: { ...groupInvitationInfo}
    })
    return groupInvitationUpdated;
  };


  




export default {updateGroupInvitation,getGroupInvitationById, getAllInvitationsForUser, createGroupInvitation, getGroupInvitation, deleteGroupInvitation, getAllGroupInvitations, getAllInvitationsAcceptedForUser, convertOwnerInMember}