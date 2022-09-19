



const mailsNotificationMiddleware = async ( req, res, next) => {
    try{
      if(req.body.mailsNotifications=="ON" || req.body.mailsNotifications=="OFF"){
        next()
      }
      else {
        res.status(400).send("Mails Notifications have to be ON/OFF")
      }
      


    } catch(err) {
        res.status(400).send("Mails Notifications have to be ON/OFF")
    }
}

export default mailsNotificationMiddleware;