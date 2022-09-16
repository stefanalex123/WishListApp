import { validate } from "node-cron";
import validateDate from "validate-date"
import isLeapYear from "leap-year";
import e from "express";




const birthdayMiddleware = async ( req, res, next) => {
   
    try{
        var validBirthday=false;
        const date=new Date()
        const birthday=req.body.birthday;
        const birthdayDay=birthday.substring(0,2);
        const birhdayMonth=birthday.substring(3,5);
        const birthdayYear=birthday.substring(6,10);
        const birthdayYearLeap= parseInt(birthdayYear)
        if((birhdayMonth=='01' || birhdayMonth=='03' || birhdayMonth=='05' || birhdayMonth=='07' || birhdayMonth=='08'
        || birhdayMonth=='10' || birhdayMonth=='12')  && birthdayYear>=1900 && birthdayYear<=date.getFullYear()-16){

                if((birthdayDay=='01' || birthdayDay=='02' || birthdayDay=='03' || birthdayDay=='04' || birthdayDay=='05'
                || birthdayDay=='06' || birthdayDay=='07' || birthdayDay=='08' || birthdayDay=='09'
                || (birthdayDay>=10 && birthdayDay<=31))){
                        if(birthday[2]=='/' && birthday[5]=='/' && birthday.length==10){
                            validBirthday=true;
                            next();
                        }
                        else {
                            res.status(404).send("Invalid Date Format, Try: DD/MM/YYYY")
                        }

                }
                else {
                    res.status(404).send("Invalid Date Format, Try: DD/MM/YYYY");
                    
                }

        }

       
        else if((birhdayMonth=='04' || birhdayMonth=='06' || birhdayMonth=='09' || birhdayMonth=='11') 
                 && birthdayYear>=1900 && birthdayYear<=date.getFullYear()-16){
            
             
                if((birthdayDay=='01' || birthdayDay=='02' || birthdayDay=='03' ||birthdayDay=='04' || birthdayDay=='05'
                || birthdayDay=='06' || birthdayDay=='07' || birthdayDay=='08' || birthdayDay=='09'
                || (birthdayDay>=10 && birthdayDay<=30))){
                    if(birthday[2]=='/' && birthday[5]=='/' && birthday.length==10){
                        validBirthday=true;
                        next();
                    }
                    else {
                        res.status(404).send("Invalid Date Format, Try: DD/MM/YYYY")
                    }
                }
                else {
                    res.status(404).send("Invalid Format, Try: DD/MM/YYYY")
                }

    }

   
        else if(birhdayMonth=='02' && (isLeapYear(birthdayYearLeap)==true) && birthdayYear>=1900 && birthdayYear<=date.getFullYear()-16){

                if((birthdayDay=='01' || birthdayDay=='02' || birthdayDay=='03' ||birthdayDay=='04' || birthdayDay=='05'
                || birthdayDay=='06' || birthdayDay=='07' || birthdayDay=='08' || birthdayDay=='09'
                || (birthdayDay>=10 && birthdayDay<=29))){
                    if(birthday[2]=='/' && birthday[5]=='/' && birthday.length==10){
                        validBirthday=true;
                        next();
                    }
                    else {
                        res.status(404).send("Invalid Date Format, Try DD/MM/YYYY")
                    }

                }
                else {
                    res.status(404).send("Invalid Format, Try DD/MM/YYYY")
                }

}


    else if(birhdayMonth=='02' && (isLeapYear(birthdayYearLeap)==false) && birthdayYear>=1900 && birthdayYear+16<=date.getFullYear()-16){

            if((birthdayDay=='01' || birthdayDay=='02' || birthdayDay=='03' ||birthdayDay=='04' || birthdayDay=='05'
            || birthdayDay=='06' || birthdayDay=='07' || birthdayDay=='08' || birthdayDay=='09'
            || (birthdayDay>=10 && birthdayDay<=28))){
                if(birthday[2]=='/' && birthday[5]=='/' && birthday.length==10){
                    validBirthday=true;
                    next();
                }
                else {
                    res.status(404).send("Invalid Format, Try DD/MM/YYYY")
                }

            }
            else {
                res.status(404).send("Invalid Format, Try DD/MM/YYYY")
            }

}

else {
    res.status(404).send("Invalid Date Format, Try DD/MM/YYYY")
}



    } catch(err) {
        res.status(404).send("Format Date incorect")
        console.log(err)
    }
}


export default birthdayMiddleware;