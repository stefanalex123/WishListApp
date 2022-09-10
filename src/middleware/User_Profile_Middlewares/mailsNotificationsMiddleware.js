



const mailsNotificationMiddleware = async ( req, res, next) => {
    try{
      if(req.body.mailsNotifications=="ON" || req.body.mailsNotifications=="OFF"){
        next()
      }
      else {
        res.send("Mails Notifications have to be ON/OFF")
      }
      


    } catch(err) {
        res.send("Mails Notifications have to be ON/OFF")
    }
}

export default mailsNotificationMiddleware;