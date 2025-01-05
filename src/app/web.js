import expres from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import cors from "cors";

dotenv.config();



export const web = expres();

web.use(cookieParser(process.env.COOKIE_SECRET));
web.use(expres.json());
web.use(cors());




