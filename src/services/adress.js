import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const getAdress= async (id) => {
    const adress = await prisma.adress.findUnique({
      where: {
        id:id
      }
    })
    return adress;
  };

  
  const getAllAdresses= async (id) => {
    const adress = await prisma.adress.findMany({
      where: {
        userid:id
      }
    })
    return adress;
  };

const createAdress= async (userId ,country, city, street, flat, postalCode) =>{
    const adress=await prisma.adress.create({
        data: {
            userId:userId,
            country:country,
            city:city,
            street:street,
            flat:flat,
            postalCode:postalCode,
        }
    });
        return adress;
};



const updateAdress = async (id, adressInfo) => {
    const adress = await prisma.adress.update({
      where: {
        id: id
      },
      data: { ...adressInfo }
    })
    return adress;
  };

  const deleteAdress = async (id) => {
    const adress = await prisma.adress.delete({
        where: {
            id: id
        }
    });
    return adress;
  };
  


export default {createAdress, updateAdress, getAdress, getAllAdresses, deleteAdress}