import express from "express";
import routes from "./routes.js";
// TODO: complete me (loading the necessary packages)
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
console.log("Frontend Url: ", FRONTEND_URL);
let corsOptions = {
    origin: FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin']
}

// TODO: complete me (CORS)
app.use(cors(corsOptions));
app.use(express.json());
app.use('', routes);

export default app;