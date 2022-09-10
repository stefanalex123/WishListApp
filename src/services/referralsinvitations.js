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



const getReferralInvitation= async (id) => {
    const referralInvitation = await prisma.mailsReferralsInvitations.findUnique({
      where: {
       id:id
      },
    })
    return referralInvitation;
  };

  const getReferralInvitationByEmailSend= async (emailSend) => {
    const referralInvitation = await prisma.mailsReferralsInvitations.findMany({
      where: {
      emailSend:emailSend
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




export default {createReferralInvitation, updateReferralInvitation, getReferralInvitation, updateReferralInvitation, getReferralInvitationByEmailSend}