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
        groupOwnerid:id
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
  

  const getAllGroups = async () => {
    const groups = await prisma.group.findMany()
    return groups;
  };


const createGroup= async (groupTitle, groupDescription, groupOwnerId) =>{
    const group=await prisma.group.create({
        data: {
            groupTitle:groupTitle,
            groupDescription:groupDescription,
            groupOwnerId:groupOwnerId
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


export default {createGroup, getAllGroupsWhereOwner, updateGroup, getGroup, deleteGroup, getAllGroups}
