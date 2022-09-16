import e from "express";
import adressServices from "../services/adress.js"


describe ('Adress Services',  ()=> {

    
      test('Getting an adress', async () => {
   
    
    const newAdress=await adressServices.createAdress('6e53024f-d078-43d0-b89e-1de0a7db2bc3', 'Romania', 'Constanta', 'Mircea Cel Batran',
        'D09', '9000000')
    const adress=await adressServices.getAdress(newAdress.id);
    
      expect(adress).toStrictEqual(
        {
            "id": newAdress.id,
            "userId": newAdress.userId,
            "country": newAdress.country,
            "city": newAdress.city,
            "street": newAdress.street,
            "flat": newAdress.flat,
            "postalCode": newAdress.postalCode
        }

      )
      const deleteAdress=await adressServices.deleteAdress(newAdress.id)
});



 test('introducing wrong Adress', async () => {

  
   
    const result=await adressServices.getAdress('213123123')
    expect(result).toBe(null)

});



 test('getting all Adresses', async () => {
   

    const newAdress1=await adressServices.createAdress('6e53024f-d078-43d0-b89e-1de0a7db2bc3', 'Romania', 'Constanta', 'Mircea Cel Batran',
        'D09', '9000000')
        const newAdress2=await adressServices.createAdress('6e53024f-d078-43d0-b89e-1de0a7db2bc3', 'Romania', 'Bucuresti', 'Mircea Cel Batran',
        'D09', '9000000')
    const result=await adressServices.getAllAdresses('6e53024f-d078-43d0-b89e-1de0a7db2bc3')

    let adresses=[];

    for(let i=0;i<result.length;i++){
        let adress = 
            {
                "id": result[i].id,
                "userId": result[i].userId,
                "country": result[i].country,
                "city": result[i].city,
                "street": result[i].street,
                "flat": result[i].flat,
                "postalCode": result[i].postalCode
            }

        

        adresses.push(adress)

    }


    expect(result).toStrictEqual(adresses)

    const deleteAdress1=await adressServices.deleteAdress(newAdress1.id)
    const deleteAdres2=await adressServices.deleteAdress(newAdress2.id)
});



 


 test('Update Andress', async () => {
    const newAdress=await adressServices.createAdress('6e53024f-d078-43d0-b89e-1de0a7db2bc3', 'Romania', 'Constanta', 'Mircea Cel Batran',
        'D09', '9000000')

   
    const result=await adressServices.updateAdress(newAdress.id,
    {
        userId: '6e53024f-d078-43d0-b89e-1de0a7db2bc3',
        country: 'Portugal',
        city: 'Aveiro',
        street:'Aveiro Street',
        flat:'D10',
        postalCode:'990800',
      
    }
    )

    
    expect(result).toStrictEqual(
        {
            id: newAdress.id,
            userId: '6e53024f-d078-43d0-b89e-1de0a7db2bc3',
            country: 'Portugal',
            city: 'Aveiro',
            street:'Aveiro Street',
            flat:'D10',
            postalCode:'990800',
          
        }
    )

    const deleteAdress=await adressServices.deleteAdress(result.id) 


});  



 test('Delete Andress', async () => {
   
    const newAdress=await adressServices.createAdress('6e53024f-d078-43d0-b89e-1de0a7db2bc3', 'Romania', 'Constanta', 'Mircea Cel Batran',
    'D09', '9000000')
    
    const adressDeleted=await adressServices.deleteAdress(newAdress.id)


    expect(adressDeleted).toStrictEqual({
        "id": adressDeleted.id,
        "userId": adressDeleted.userId,
        "country": adressDeleted.country,
        "city": adressDeleted.city,
        "street": adressDeleted.street,
        "flat": adressDeleted.flat,
        "postalCode": adressDeleted.postalCode

    })




});    
});  