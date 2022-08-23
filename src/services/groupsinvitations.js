import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();



const deletegroupinvitation= async (groupid, userinvitedid) => {


    const groupinvitation = await prisma.groupInvitations.findMany({
      where: {
        groupid:groupid,
        userinvitedId:userinvitedid
      }
    })
  
    const groupinvitationdeleted = await prisma.groupInvitations.delete({
      where: {
        id:groupinvitation[0].id
      }
     
    })

    return groupinvitationdeleted

}
  

const getgroupinvitation= async (groupid, userinvitedid) => {
    const groupinvitation = await prisma.groupInvitations.findMany({
      where: {
        groupid:groupid,
        userinvitedId:userinvitedid
      }
    })
    return groupinvitation;
  };



const creategroupinvitation= async (groupid ,userinvitedid) =>{
    const groupinvitation=await prisma.groupInvitations.create({
        data: {
            status:"PENDING",
            groupid:groupid,
            userinvitedid:userinvitedid
        }
    });
        return groupinvitation;
};

const getallgroupinvitations= async (id) => {
    const allgroupinvitations = await prisma.groupInvitations.findMany({
      where: {
        groupid:id
      },
      include: {
       userprofile:true
           
    }
    })
    return allgroupinvitations;
  };

  const getallinvitationsforuser= async (id) => {
    const allgroupinvitations = await prisma.groupInvitations.findMany({
      where: {
        userinvitedid:id
      },
      include: {
        group:true
      }
    })



    

    return allgroupinvitations;
  };

  const updategroupinvitation= async (id, groupinvitationInfo) => {

    const groupinvitationUpdated = await prisma.groupInvitations.update({
      where: {
        id:id
      },
      data: { ...groupinvitationInfo}
    })
    return groupinvitationUpdated;
  };
  




export default {updategroupinvitation, getallinvitationsforuser, creategroupinvitation, getgroupinvitation, deletegroupinvitation, getallgroupinvitations}