import userServices from "../services/user.js";

const addUser = async (req, res, next) => {
    try {
        const newUser = await userServices.addUser( req.body.username, req.body.password);
        res.json(newUser);
    } catch (err) {
        next(err);
    }
};

const loginUser = async (req, res, next) => {
    try {
        const token = await userServices.loginUser(req.body.username, req.body.password);
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



export default { addUser, loginUser};