import {getRefreshToken, getSidToken, loginService, registerService} from "../services/authServices.js";

export const getRefreshTokenController = (req, res) => {
    try {
        const rsid = getRefreshToken(req);
        res.cookie("rsid", rsid, {
            signed: true,
            maxAge: 60000 * 60 * 24 * 30,
            httpOnly: true,
        });
        return res.status(200).json({
            statusCode: 200,
            message: "Token created",
        });
    } catch (err) {
        return res.status(400).json({
            statusCode: 400,
            message: err.message,
        });
    }
};

export const getSidController = (req, res) => {
    try {
        const token = getSidToken(req);

        return res.status(200).json({
            statusCode: 200,
            message: "Token created",
            _token: token
        })
    } catch (err) {
        return res.status(err.statusCode).json({
            statusCode: err.statusCode,
            message: `Failed to get token: ${err.message}`,
        });
    }
}

export const loginController = async (req, res) => {
    try {
        const userCredential = await loginService(req);
        return res.status(200).json({
            statusCode: 200,
            message: "Login success",
            data: {
                ...userCredential
            }
        });
    } catch (e) {
        return res.status(e.statusCode).json({
            statusCode: e.statusCode,
            message: e.message
        })
    }
}

export const registerController = async (req, res) => {
    try {
        const user = await registerService(req);
        return res.status(201).json({
            statusCode: 201,
            message: "Account created",
            data: {
                ...user
            }
        });
    } catch (e) {
        return res.status(e.statusCode).json({
           statusCode: e.statusCode,
           message: e.message
        });
    }
}
