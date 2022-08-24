import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const updategroup = async (id, groupInfo) => {
  const group = await prisma.group.update({
    where: {
      id: id
    },
    data: { ...groupInfo }
  })
  return group;
};



const getallgroupswhereowner= async (id) => {
    const allgroupswhereowner = await prisma.group.findMany({
      where: {
        groupownerid:id
      }
    })
    return allgroupswhereowner;
  };

  const getgroup= async (id) => {
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

const deletegroup = async (id) => {
  const group = await prisma.group.delete({
      where: {
          id: id
      }
  });
  return group;
};


export default {creategroup, getallgroupswhereowner, updategroup, getgroup, deletegroup}
