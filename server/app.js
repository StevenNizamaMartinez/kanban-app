import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { corsOptions } from "./src/libs/config";

const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(corsOptions);

export default app;
