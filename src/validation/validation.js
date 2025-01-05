import { ValidationError } from "../utility/ValidationErr.js";

export const validate = (data, schema) => {
    const { error, value } = schema.validate(data);

    if (error) throw new ValidationError(error.message);

    return value;
};
