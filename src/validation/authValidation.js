import Joi from "joi";
import dotenv from "dotenv";
import { validate } from "./validation.js";

dotenv.config();

export const getRsidValidation = (data) => {
    const schema = Joi.object({
        userId: Joi.string().length(26).required(),
        businessId: Joi.string().length(26).required(),
        role: Joi.string().valid("superAdmin", "user").required(),
        secret: Joi.string().valid(process.env.REQ_SECRET).required().error((err) => {
            return new Error('The provided secret is invalid or missing.');
        }),
    });

    return validate(data, schema);
};

export const getSidValidation = (data) => {
    const schema = Joi.object({
        secret: Joi.string().valid(process.env.REQ_SECRET).required().error((err) => {
            return new Error("The provided secret is invalid or missing.")
        }),
    });
    
    return validate(data, schema);
}

export const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().error(new Error("Invalid email address format")),
        password: Joi.string()
            .min(8)
            .max(16)
            .pattern(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/, "password")
            .required()
            .messages({
                "string.min": "Password must be at least 8 characters long.",
                "string.max": "Password must not exceed 16 characters.",
                "string.pattern.name": "Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character."
            }),
        secret: Joi.string().valid(process.env.REQ_SECRET).required().error((err) => {
            return new Error("The provided secret is invalid or missing.")
        }),
    });
    
    return validate(data, schema);
}

export const registerValidation = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().max(255).required(),
        lastName: Joi.string().max(255).required(),
        email: Joi.string().email().required().error(new Error("Invalid email address format")),
        password: Joi.string()
            .min(8)
            .max(16)
            .pattern(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/, "password")
            .required()
            .messages({
                "string.min": "Password must be at least 8 characters long.",
                "string.max": "Password must not exceed 16 characters.",
                "string.pattern.name": "Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character.",
                "any.required": "Password cannot be blank."
            }),
        role: Joi.string().valid("superAdmin", "user").required(),
        businessName: Joi.string().required().messages({
            "any.required": "Business name is required."
        }),
        phone: Joi.string()
            .allow(null)
            .pattern(/^0\d{11,13}$/, "Indonesian phone number")
            .messages({
                "string.pattern.name": "Phone number must start with '0' and have a maximum of 13 digits number.",
            }),
        businessEmail: Joi.string().email().required().error(new Error("Invalid email address format")),
        businessType: Joi.string()
            .valid("retail", "jasa", "produksi")
            .required()
            .messages({
                "any.only": "Business type must be one of the following: retail, jasa, or produksi.",
                "any.required": "Business type is required."
            }),
        secret: Joi.string().valid(process.env.REQ_SECRET).required().error((err) => {
            return new Error("The provided secret is invalid or missing.")
        }),
    });
    
    return validate(data, schema);
}


