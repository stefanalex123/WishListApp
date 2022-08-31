import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();



const createReferralInvitation= async (userDeliverId, groupId, emailSend, status) =>{
    const referralInvitation=await prisma.mailsReferralsInvitations.create({
        data: {
           userDeliverId:userDeliverId,
           groupId:groupId,
           emailSend:emailSend,
           status:status
        }
    });
        return referralInvitation;
};



const getReferralInvitation= async (groupId, userDeliverId, email) => {
    const referralInvitation = await prisma.mailsReferralsInvitations.findMany({
      where: {
        groupId:groupId,
        userDeliverId:userDeliverId,
        emailSend:email
      },
    })
    return referralInvitation;
  };

  const updateReferralInvitation = async (id, referralInvitationInfo) => {
    const referralInvitation = await prisma.mailsReferralsInvitations.update({
      where: {
        id: id
      },
      data: { ...referralInvitationInfo }
    })
    return referralInvitation;
  };




export default {createReferralInvitation, updateReferralInvitation, getReferralInvitation, updateReferralInvitation}