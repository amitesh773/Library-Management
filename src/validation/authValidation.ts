import Joi from "joi";


export const authValidation = Joi.object({
        name: Joi.string()
        .min(3)
        .max(12)
        .required(),

        surname: Joi.string()
        .min(3)
        .max(12)
        .required(),

        phone: Joi.string()
        .min(10)
        .max(10)
        .pattern(/^[0-9{10}]/) 
        .required(),

        email: Joi.string()
        .email()
        .required(),

        password: Joi.string()
        .min(6)
        .max(16)
        .required()
        .pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)

    })