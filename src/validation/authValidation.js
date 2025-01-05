import Joi, { date } from "joi";
import dotenv from "dotenv";
import { validate } from "./validation.js";

dotenv.config();

export const getRsidValidation = (data) => {
    const schema = Joi.object({
        userId: Joi.string().required().length(26).required(),
        businessId: Joi.string().required().length(26).required(),
        role: Joi.string().valid("superAdmin", "user").required(),
        secret: Joi.string().valid(process.env.REQ_SECRET).required(),
    });

    return validate(data, schema);
};

export const getSidValidation = (data) => {
    const schema = Joi.object({
        secret: Joi.string().valid(process.env.REQ_SECRET).required(),
    });
    
    return validate(data, schema);
}

export const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(16).pattern(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/, "password").required(),
        secret: Joi.string().valid(process.env.REQ_SECRET).required()
    });
}