export const verifyJsonReq = (req, res, next) => {
    const contentType = req.headers["content-type"];

    if (contentType === "application/json") return next();

    return res.json({
        statusCode: 400,
        message: "Bad request: req body must be a JSON",
    });
};
