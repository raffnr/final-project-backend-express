import jwt from "jsonwebtoken";
import {ulid} from "ulid";
import dotenv from "dotenv";
import {ResponseError} from "../utility/ResponseErr.js";
import {
    getRsidValidation,
    getSidValidation,
    loginValidation,
    registerValidation
} from "../validation/authValidation.js";
import {queryToDb} from "../utility/queryToDb.js";
import bcrypt from "bcrypt";

dotenv.config();

export const verifyAccessTokenService = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        throw new ResponseError(`${err.message}`, 401);
    }
};

export const getRefreshToken = (req) => {
    const { body } = req;
    try {
        getRsidValidation(body);

        const payload = {
            userId: body.userId,
            businessId: body.businessId,
            role: body.role,
        };

        return jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });
    } catch (err) {
        throw new ResponseError(`Invalid request body: ${err.message}`, 400);
    }
};

export const getSidToken = (req) => {
    const body = req.body;
    getSidValidation(body);

    const token = req.signedCookies?.rsid;
    if (!token) throw new ResponseError("Refresh token expired or not exist", 401);

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const payload = {
        userId: decode.userId,
        businessId: decode.businessId,
        role: decode.role,
    };

    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "15m"});
};

export const loginService = async (req) => {
    const body = req.body;
    loginValidation(body);

    const {email:bodyEmail, password:bodyPassword} = body;

    const query = "SELECT userId, email, password, role FROM user WHERE email = ?";

    const [user] = await queryToDb(query, [bodyEmail]);

    if (!user.userId) throw ResponseError("Wrong email or password", 400);

    const matchPassword = await bcrypt.compare(bodyPassword, user.password);
    if (!matchPassword) throw ResponseError("Wrong email or password", 400);

    const query2 = "SELECT businessId FROM business WHERE userId = ?";

    const [{businessId}] = await queryToDb(query2, [user.userId]);

    return {
        userId: user.userId,
        businessId,
        role: user.role
    };
}

export const registerService = async (req) => {
    const {body} = req;
    const {email, firstName, lastName, password, role, businessName, phone, businessEmail, businessType} = body;

    registerValidation(body);

    const [{checkEmail}] = await queryToDb("SELECT COUNT(email) as checkEmail FROM user WHERE email = ?", [body.email]);
    if (checkEmail) throw new ResponseError("Email already registered", 400);

    const userId = ulid();
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await queryToDb("INSERT INTO user (userId, email, firstName, lastName, password, role) VALUES (?, ?, ?, ?, ?, ?)", [
        userId,
        email,
        firstName,
        lastName,
        hashedPassword,
        role
    ]);

    const businessId = ulid();
    await queryToDb("INSERT INTO business (businessId, userId, businessName, phone, businessEmail, businessType) VALUES (?, ?, ?, ?, ?, ?)", [
        businessId,
        userId,
        businessName,
        phone,
        businessEmail,
        businessType
    ]);

    return {
        userId,
        businessId,
        role,
    };
}
