


const statusMiddleware = async ( req, res, next) => {


try{
if(req.body.status=="ACCEPTED" || req.body.status=="DECLINED"){
    next();
}
else {
    res.send("It has to be accepted or declined")
}

} catch(err) {
   
}
    
}
       
       
       
     
    

  

  
   

  
  export default statusMiddleware;