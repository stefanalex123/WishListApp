
import userservices from "../services/user.js";





const adduser = async (req, res, next) => {
    try {
        const newuser = await userservices.adduser(req.body.username, req.body.password);
        res.json(newuser);
    } catch (err) {
        next(err);
    }
};

const loginuser = async (req, res, next) => {
    try {
        const token = await userservices.loginuser(req.body.username, req.body.password);
        if(token=="InvalidUser"){
            res.send("The username is incorrect")
        }

        if(token=="InvalidPassword"){
            res.send("The password is incorrect")
        }


        else {

        
        res.send({
            token
        });
    }
    } catch (err) {
        next(err);
    }
};



export default { adduser, loginuser};