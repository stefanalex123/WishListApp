import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const deletecontributioninvitation= async (itemid, usercontributerid) => {


    const contributioninvitation = await prisma.contributionInvitation.findMany({
      where: {
        itemid:itemid,
        usercontributerid:usercontributerid
      }
    })
  
    const contributioninvitationdeleted = await prisma.contributionInvitation.delete({
      where: {
        id:contributioninvitation[0].id
      }
     
    })

    return contributioninvitationdeleted;

}
  

const getcontributioninvitation= async (itemid, usercontributerid) => {
    const contributioninvitation = await prisma.contributionInvitation.findMany({
      where: {
        itemid:itemid,
        usercontributerid:usercontributerid
      }
    })
    return contributioninvitation;
  };

  const getcontributioninvitation2= async (id) => {
    const contributioninvitation = await prisma.contributionInvitation.findUnique({
      where: {
      id:id
      }
    })
    return contributioninvitation;
  };





const createcontributioninvitation= async (itemid, usercontributerid,useraskedid) =>{
    const contributioninvitation=await prisma.contributionInvitation.create({
        data: {
            itemid:itemid,
            usercontributerid:usercontributerid,
            status:"PENDING",
            useraskedid:useraskedid
        }
    });
        return contributioninvitation;
};


  const getallcontributioninvitationsforuser= async (id) => {
    const allcontributioninvitations = await prisma.contributionInvitation.findMany({
      where: {
        useraskedid:id
      }
    })


    return allcontributioninvitations;
  };



  const updatecontributioninvitation= async (id, contributioninvitationInfo) => {

    const contributioninvitation = await prisma.contributionInvitation.update({
      where: {
        id:id
      },
      data: { ...contributioninvitationInfo}
    })
    return updatecontributioninvitation;
  };

  const getcontributorsforitem= async (id) => {
    const contributorsforitem = await prisma.contributionInvitation.findMany({
      where: {
        itemid:id
      },
      include: {
       user:true
      }
    })

return contributorsforitem;
}
  




export default {getcontributorsforitem, createcontributioninvitation, getcontributioninvitation2 ,updatecontributioninvitation, deletecontributioninvitation, getallcontributioninvitationsforuser, getcontributioninvitation}


