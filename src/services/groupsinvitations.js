import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();



const deletegroupinvitation= async (groupid, userInvitedId) => {


    const groupinvitation = await prisma.groupInvitations.findMany({
      where: {
        groupid:groupid,
        userinvitedId:userInvitedId
      }
    })
  
    const groupinvitationdeleted = await prisma.groupInvitations.delete({
      where: {
        id:groupinvitation[0].id
      }
     
    })

    return groupinvitationdeleted

}
  

const getgroupinvitation= async (groupid, userInvitedId) => {
    const groupinvitation = await prisma.groupInvitations.findMany({
      where: {
        groupid:groupid,
        userinvitedId:userInvitedId
      }
    })
    return groupinvitation;
  };



const createGroupInvitation= async (groupid ,userinvitedId) =>{
    const groupinvitation=await prisma.groupInvitations.create({
        data: {
            status:"PENDING",
            groupid:groupid,
            userInvitedId:userinvitedId
        }
    });
        return groupinvitation;
};

const getAllGroupInvitations= async (id) => {
    const allgroupinvitations = await prisma.groupInvitations.findMany({
      where: {
        groupid:id
      },
      include: {
       user:true
           
    }
    })
    return allgroupinvitations;
  };


export default {createGroupInvitation, getgroupinvitation, deletegroupinvitation, getAllGroupInvitations}