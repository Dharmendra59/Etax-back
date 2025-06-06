import Joi from "joi";
import express from "express"


export const registerValidation = (req, res, next) => { 
      const schema = Joi.object({
        name: Joi.string().min(2).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required()
      });
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: "Bad Request", error });
      }
      next();
};
export const loginValidation = (req, res, next) => { 
      const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required()
      });
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: "Bad Request", error });
      }
      next();
};
    
// export const loginValidation = (req, res, next) => {
//       const schema = Joi.object({
//             email: Joi.string().email().required(),
//             password: Joi.string().min(4).max(100).required()
//       });
//       const {error} = schema.validate(req.body);
//       if(error){
//             return res.status(400)
//                   .json({message: "Bad Request", error})
//       }
//       next();
// }

// export { registerValidation, loginValidation }  