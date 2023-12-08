import joi from 'joi';
import chalk from 'chalk';
export const postRegisterValidation =(req, res, next)=>{
    const schema =joi.object({
        title :joi.string().min(5).trim().required(),
        content :joi.string().min(10).required(),
    });

    const {error} = schema.validate(req.body);
    if(error){
        console.log(`${chalk.red.bold("Error deatails : ")}` + error);
        return res.status(400).send(error.details[0].message)
    }
    next();
}