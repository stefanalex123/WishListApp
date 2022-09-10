import notificationsServices from "../services/notifications.js";

const getAllNotifications = async (req, res, next) => {
    try {     

        const allNotifications= await notificationsServices.getAllNotifications(req.auth.userId);
        for(let i=0;i<allNotifications.length;i++){

            const updateNotification = await notificationsServices.updateNotification(allNotifications[i].id, {
                notificationDescription:allNotifications[i].notificationDescription,
                deliverAt:allNotifications[i].deliverAt,
                userdeliverId: allNotifications[i].userdeliverId,
                status:"SEEN",
              });
        }
        const allUpdatedNotifications= await notificationsServices.getAllNotifications(req.auth.userId);

        res.json(allUpdatedNotifications);
    } catch (err) {
        next(err);
    }
  };


  const getAllNotificationsPage = async (req, res, next) => {
    try {     
        
        

        const allNotifications= await notificationsServices.getAllNotifications(req.auth.userId);
        let notifications=[]
        let page1=(req.query.page1)*4-3;
        let limitpage=(req.query.limitpage)*4;

        for(let i=page1;i<=limitpage;i++){

        let notification=[
            {
                "id":allNotifications[i].id,
                "notificationDescription":allNotifications[i].notificationDescription,
                "deliverAt":allNotifications[i].deliverAt,
                "userdeliverId":allNotifications[i].userdeliverId,
                "status":allNotifications[i].status,
            },
        ]

        notifications.push(notification)

        }

        res.json(notifications);
    } catch (err) {
        next(err);
    }
  };

 


  export default {getAllNotifications, getAllNotificationsPage}