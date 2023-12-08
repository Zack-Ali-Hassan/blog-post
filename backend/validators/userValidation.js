import joi from 'joi';
import chalk from 'chalk';
export const userRegisterValidation =(req, res, next)=>{
    const schema =joi.object({
        username :joi.string().min(3).max(20).required(),
        email :joi.string().email().required(),
        password :joi.string().min(8).required(),
    });

    const {error} = schema.validate(req.body);
    if(error){
        console.log(`${chalk.red.bold("Error deatails : ")}` + error);
        return res.status(400).send(error.details[0].message)
    }
    next();
}
export const userLoginValidation =(req, res, next)=>{
    const schema =joi.object({
        username :joi.string().min(3).max(20).required(),
        password :joi.string().min(8).required(),
    });

    const {error} = schema.validate(req.body);
    if(error){
        console.log(`${chalk.red.bold("Error deatails : ")}` + error);
        return res.status(400).send(error.details[0].message)
    }
    next();
}
