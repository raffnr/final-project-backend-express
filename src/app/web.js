import expres from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import cors from "cors";
import authRoutes from "../routes/authRoutes.js";
import { verifyJsonReq } from "../middleware/reqJsonVerify.js";
import {verifyAccessToken} from "../middleware/verifyAccessToken.js";

dotenv.config();

export const web = expres();

web.use(cookieParser(process.env.COOKIE_SECRET));
web.use(expres.json());
web.use(cors());

web.use(verifyJsonReq)

web.use(authRoutes.auth);

web.use(verifyAccessToken);




