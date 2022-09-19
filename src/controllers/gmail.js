import refferalInvitationsService from "../services/referralsinvitations.js"

const getLoginAdress = async (req, res, next) => {
    try {

        
        res.send('<a href="gmail/auth/google">Authenticate with Google</a>');
    } catch (err) {
        next(err);
    }
  };



  export default {getLoginAdress};