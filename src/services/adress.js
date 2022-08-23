import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const getadress= async (id) => {
    const adress = await prisma.adress.findUnique({
      where: {
        id:id
      }
    })
    return adress;
  };

  
  const getalladresses= async (id) => {
    const adress = await prisma.adress.findMany({
      where: {
        userid:id
      }
    })
    return adress;
  };

const createadress= async (userid ,country, city, street, flat, postalcode) =>{
    const adress=await prisma.adress.create({
        data: {
            userid:userid,
            country:country,
            city:city,
            street:street,
            flat:flat,
            postalcode:postalcode,
        }
    });
        return adress;
};



const updateadress = async (id, adressInfo) => {
    const adress = await prisma.adress.update({
      where: {
        id: id
      },
      data: { ...adressInfo }
    })
    return adress;
  };

  const deleteadress = async (id) => {
    const adress = await prisma.adress.delete({
        where: {
            id: id
        }
    });
    return adress;
  };
  


export default {createadress, updateadress, getadress, getalladresses, deleteadress}