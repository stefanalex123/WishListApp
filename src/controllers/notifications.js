import notificationsServices from "../services/notifications.js";

const getAllNotifications = async (req, res, next) => {
    try {     
        res.json(await notificationsServices.getAllNotifications(req.auth.userId));
    } catch (err) {
        next(err);
    }
  };

 


  export default {getAllNotifications}