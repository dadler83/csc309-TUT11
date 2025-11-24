import express from "express";
import routes from "./routes.js";
// TODO: complete me (loading the necessary packages)
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
let corsOptions = {
    origin: FRONTEND_URL,
}

// TODO: complete me (CORS)
app.use(cors(corsOptions));
app.use(express.json());
app.use('', routes);

export default app;