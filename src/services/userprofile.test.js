import e from "express";
import userProfileServices from "../services/userprofile.js"


describe ('User Profile Services',  ()=> {

    
      test('Getting the User Profile', async () => {
   
    const newUserProfile= await userProfileServices.createUserProfile('6e53024f-d078-43d0-b89e-1de0a7db2bc3', 'focanstefan9988@gmail.com',
    'stefanalex10', '0877762712', 'OFF', '27/12/2000')
 
    const userProfile=await userProfileServices.getUserProfile(newUserProfile.userId);
    
      expect(userProfile).toStrictEqual(
        {
        
            "userId": newUserProfile.userId,
            "email": newUserProfile.email,
            "nickname": newUserProfile.nickname,
            "phoneNumber": newUserProfile.phoneNumber,
            "mailsNotifications": newUserProfile.mailsNotifications,
            "birthday": newUserProfile.birthday,
            "verifiedAccount":'UNVERIFIED',
            "socketId":'0'
        }

      )
      const deleteUserProfile=await userProfileServices.deleteUserProfile((userProfile.userId))
});

test('Getting the User Profile By Email', async () => {
   
    const newUserProfile= await userProfileServices.createUserProfile('6e53024f-d078-43d0-b89e-1de0a7db2bc3', 'focanstefan9988@gmail.com',
    'stefanalex10', '0877762712', 'OFF', '27/12/2000')
 
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
            "socketId":'0'
        }

      )
      const deleteUserProfile=await userProfileServices.deleteUserProfile((userProfile.userId))
});



test('Update User Profile', async () => {
    const newUserProfile= await userProfileServices.createUserProfile('6e53024f-d078-43d0-b89e-1de0a7db2bc3', 'focanstefan9988@gmail.com',
    'stefanalex10', '0877762712', 'OFF', '27/12/2000')

   
    const userProfile=await userProfileServices.updateUserProfile(newUserProfile.userId,
        {
        
            "userId": newUserProfile.userId,
            "email": newUserProfile.email,
            "nickname": newUserProfile.nickname,
            "phoneNumber": '07777777777',
            "mailsNotifications": newUserProfile.mailsNotifications,
            "birthday": newUserProfile.birthday,
            "verifiedAccount":'UNVERIFIED',
            "socketId":'0'
        }
    )

    
    expect(userProfile).toStrictEqual(
        {
        
            "userId": '6e53024f-d078-43d0-b89e-1de0a7db2bc3',
            "email":  'focanstefan9988@gmail.com',
            "nickname":'stefanalex10',
            "phoneNumber": '07777777777',
            "mailsNotifications": "OFF",
            "birthday": '27/12/2000',
            "verifiedAccount":'UNVERIFIED',
            "socketId":'0'
        }
    )

    const deleteUserProfile=await userProfileServices.deleteUserProfile((userProfile.userId))


});  


test('Delete User Profile', async () => {
   
    const newUserProfile= await userProfileServices.createUserProfile('6e53024f-d078-43d0-b89e-1de0a7db2bc3', 'focanstefan9988@gmail.com',
    'stefanalex10', '0877762712', 'OFF', '27/12/2000')

    
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
            "socketId":userProfileDeleted.socketId
        }

    )




});    




});  