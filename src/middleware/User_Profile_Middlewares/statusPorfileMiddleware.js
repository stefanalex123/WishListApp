



const statusProfileMiddleware = async ( req, res, next) => {
    try{
      if(req.body.status=="PUBLIC" || req.body.status=="PRIVATE"){
        next()
      }
      else {
        res.status(400).send("It has to be PRIVATE OR PUBLIC")
      }
      


    } catch(err) {
        res.status(400).send("IT HAS TO BE PRIVATE OR PUBLIC")
    }
}

export default statusProfileMiddleware;