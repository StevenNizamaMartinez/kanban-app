import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "https://kanban-app-psi.vercel.app/",
  credentials: true,
}));
app.get("/", (req, res) => {
  res.json({
    version: "1.0.1",
    author: "Steven Nizama",
    name: "API REST KANBAN",
  });
});

export default app;
