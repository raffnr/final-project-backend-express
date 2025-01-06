import {ResponseError} from "./ResponseErr.js";
import {createConnection} from "./createConnection.js";

export const queryToDb = async (query, parameter) => {
    let conn;
    try {
        conn = await createConnection();

        const [data] = await conn.query(query, parameter);

        return data;
    } catch (err) {
        throw new ResponseError(err.message, 500);
    } finally {
        if (conn) conn.release();
    }
}

