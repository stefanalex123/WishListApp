import e from "express";
import userProfileServices from "../services/userprofile.js"


describe ('User Profile Services',  ()=> {

    
      test('Getting the User Profile', async () => {
   
    const newUserProfile= await userProfileServices.getUserProfile('a0da629a-b19e-4973-bfaa-419c009872e0')
 
    const userProfile=await userProfileServices.getUserProfile('a0da629a-b19e-4973-bfaa-419c009872e0');
    
      expect(userProfile).toStrictEqual(
        {
        
            "userId": newUserProfile.userId,
            "email": newUserProfile.email,
            "nickname": newUserProfile.nickname,
            "phoneNumber": newUserProfile.phoneNumber,
            "mailsNotifications": newUserProfile.mailsNotifications,
            "birthday": newUserProfile.birthday,
            "verifiedAccount":'UNVERIFIED',
            "status":"PUBLIC",
            "socketId":'0'
        }

      )
      //const deleteUserProfile=await userProfileServices.deleteUserProfile((userProfile.userId))
});

test('Getting the User Profile By Email', async () => {
   
    const newUserProfile= await userProfileServices.getUserProfile('a0da629a-b19e-4973-bfaa-419c009872e0')

    const userProfile=await userProfileServices.getUserProfileByEmail(newUserProfile.email);
    
      expect(userProfile).toStrictEqual(
        {
        
            "userId": newUserProfile.userId,
            "email": newUserProfile.email,
            "nickname": newUserProfile.nickname,
            "phoneNumber": newUserProfile.phoneNumber,
            "mailsNotifications": newUserProfile.mailsNotifications,
            "birthday": newUserProfile.birthday,
            "verifiedAccount":'UNVERIFIED',
            "status":"PUBLIC",
            "socketId":'0'
        }

      )
      //const deleteUserProfile=await userProfileServices.deleteUserProfile((userProfile.userId))
});



test('Update User Profile', async () => {
    const newUserProfile= await userProfileServices.getUserProfile('a0da629a-b19e-4973-bfaa-419c009872e0')

   
    const userProfile=await userProfileServices.updateUserProfile(newUserProfile.userId,
        {
        
            "userId": newUserProfile.userId,
            "email": newUserProfile.email,
            "nickname": newUserProfile.nickname,
            "phoneNumber": '07777777777',
            "mailsNotifications": newUserProfile.mailsNotifications,
            "birthday": newUserProfile.birthday,
            "verifiedAccount":'UNVERIFIED',
            "status":"PUBLIC",
            "socketId":'0'
        }
    )

    
    expect(userProfile).toStrictEqual(
        {
        
            "userId": newUserProfile.userId,
            "email":  newUserProfile.email,
            "nickname":newUserProfile.nickname,
            "phoneNumber": '07777777777',
            "mailsNotifications": newUserProfile.mailsNotifications,
            "birthday":newUserProfile.birthday,
            "verifiedAccount":newUserProfile.verifiedAccount,
            "status":newUserProfile.status,
            "socketId":newUserProfile.socketId
        }
    )

    //const deleteUserProfile=await userProfileServices.deleteUserProfile((userProfile.userId))


});  


test('Delete User Profile', async () => {
   
    const newUserProfile= await userProfileServices.getUserProfile('a0da629a-b19e-4973-bfaa-419c009872e0')

    
    const userProfileDeleted=await userProfileServices.deleteUserProfile(newUserProfile.userId)


    expect(userProfileDeleted).toStrictEqual(
        {
            "userId": userProfileDeleted.userId,
            "email": userProfileDeleted.email,
            "nickname": userProfileDeleted.nickname,
            "phoneNumber": userProfileDeleted.phoneNumber,
            "mailsNotifications": userProfileDeleted.mailsNotifications,
            "birthday": userProfileDeleted.birthday,
            "verifiedAccount":userProfileDeleted.verifiedAccount,
            "status":userProfileDeleted.status,
            "socketId":userProfileDeleted.socketId
        }

    )

    const addUserProfile=await userProfileServices.createUserProfile('a0da629a-b19e-4973-bfaa-419c009872e0', 'stefanalex20@gmail.com'
    , 'stefanalex20', '0788872121', 'ON', '27/12/2000')

});    




});  