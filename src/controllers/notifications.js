import notificationsServices from "../services/notifications.js"

const getallnotifications = async (req, res, next) => {
    try {

        
        res.json(await notificationsServices.getallnotifications(req.auth.userid));
    } catch (err) {
        next(err);
    }
  };







  export default {getallnotifications}