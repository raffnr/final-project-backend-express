class ValidationError extends Error {
    statusCode = 400;
    constructor(message) {
        super(message);
    }
}

export { ValidationError };