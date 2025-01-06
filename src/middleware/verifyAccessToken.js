import {verifyAccessTokenService} from "../services/authServices.js";

export const verifyAccessToken = (req, res, next) => {
    const {body: { _token } } = req;
    try {
        if (!_token) throw new ResponseError("Token not exist in req body", 401);

        const user = verifyAccessTokenService(_token);

        req.user = {
            userId: user.userId,
            businessId: user.businessId,
            role: user.role
        };

        next();
    } catch (err) {
        return res.status(err.statusCode).json({
            statusCode: err.statusCode,
            message: `Invalid token: ${err.message}`
        })
    }
};