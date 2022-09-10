import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const deleteContributionInvitation= async (itemId, userContributerId) => {


    const contributionInvitation = await prisma.contributionInvitation.findMany({
      where: {
        itemId:itemId,
        userContributerId:userContributerId
      }
    })
  
    const contributionInvitationDeleted = await prisma.contributionInvitation.delete({
      where: {
        id:contributionInvitation[0].id
      }
     
    })

    return contributionInvitationDeleted;

}
  

const getContributionInvitation= async (itemId, userContributerId) => {
    const contributionInvitation = await prisma.contributionInvitation.findMany({
      where: {
        itemId:itemId,
        userContributerId:userContributerId
      }
    })
    return contributionInvitation;
  };

  const getContributionInvitation2= async (id) => {
    const contributionInvitation = await prisma.contributionInvitation.findUnique({
      where: {
      id:id
      }
    })
    return contributionInvitation;
  };





const createContributionInvitation= async (itemId, userContributerId,userAskedId) =>{
    const contributionInvitation=await prisma.contributionInvitation.create({
        data: {
            itemId:itemId,
            userContributerId:userContributerId,
            status:"PENDING",
            userAskedId:userAskedId
        }
    });
        return contributionInvitation;
};


  const getAllContributionInvitationsForUser= async (id) => {
    const allContributionInvitations = await prisma.contributionInvitation.findMany({
      where: {
        userAskedId:id
      }
    })


    return allContributionInvitations;
  };



  const updateContributionInvitation= async (id, contributionInvitationInfo) => {

    const contributionInvitation = await prisma.contributionInvitation.update({
      where: {
        id:id
      },
      data: { ...contributionInvitationInfo}
    })
    return contributionInvitation;
  };

  const getContributorsForItem= async (id) => {
    const contributorsForItem = await prisma.contributionInvitation.findMany({
      where: {
        itemId:id
      },
      include: {
       item:true
      }
    })

return contributorsForItem;
}
  




export default {getContributorsForItem, createContributionInvitation, getContributionInvitation2 ,updateContributionInvitation, deleteContributionInvitation, getAllContributionInvitationsForUser, getContributionInvitation}


