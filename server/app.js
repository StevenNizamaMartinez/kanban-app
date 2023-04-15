import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = ['http://localhost:5173',"https://kanban-kl5tcho0v-stevennizamamartinez.vercel.app","https://kanban-app-git-master-stevennizamamartinez.vercel.app", "https://kanban-app-psi.vercel.app"];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({
    version: "1.0.0",
    author: "Steven Nizama",
    name: "API REST KANBAN",
  });
});

export default app;
