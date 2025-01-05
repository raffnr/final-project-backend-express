import dotenv from "dotenv";

import { web } from "./app/web.js";

dotenv.config();

const port = process.env.PORT;

web.listen(port, () => {
    console.log(`Server running on localhost:${port}`);
});