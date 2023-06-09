import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { corsOptions } from "./src/libs/config.js";

const app = express();

//Cors
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

export default app;
