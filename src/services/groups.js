import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const updateGroup = async (id, groupInfo) => {
  const group = await prisma.group.update({
    where: {
      id: id
    },
    data: { ...groupInfo }
  })
  return group;
};



const getAllGroupsWhereOwner= async (id) => {
    const allGroupsWhereOwner = await prisma.group.findMany({
      where: {
        groupownerid:id
      }
    })
    return allGroupsWhereOwner;
  };

  const getGroup= async (id) => {
    const group = await prisma.group.findUnique({
      where: {
        id:id
      }
    })
    return group;
  };


const creategroup= async (grouptitle, groupdescription, groupownerid) =>{
    const group=await prisma.group.create({
        data: {
            grouptitle:grouptitle,
            groupdescription:groupdescription,
            groupownerid:groupownerid
        }
    });
        return group;
};

const deleteGroup = async (id) => {
  const group = await prisma.group.delete({
      where: {
          id: id
      }
  });
  return group;
};


export default {creategroup, getAllGroupsWhereOwner, updateGroup, getGroup, deleteGroup}
