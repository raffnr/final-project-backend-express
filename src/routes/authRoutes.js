import express from "express";
import {
    getRefreshTokenController,
    getSidController,
    loginController,
    registerController
} from "../controller/authController.js";


const auth = express.Router();


auth.get("/api/auth/rsid", getRefreshTokenController);
auth.get("/api/auth/sid", getSidController);
auth.get("/api/auth/login", loginController);
auth.post("/api/auth/register", registerController);


export default {
    auth
}