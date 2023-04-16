import app from "./app.js";
import { PORT } from "./src/libs/config.js";
import { handleAuth } from "./src/middlewares/auth.middleware.js";
import { connectDB } from "./src/database/db.js";
import authRouter from "./src/routes/auth.routes.js";
import boardRouter from "./src/routes/board.routes.js";
import cardRouter from "./src/routes/card.routes.js";
import listRouter from "./src/routes/list.routes.js";

app.set("port", PORT);

// ROUTES
app.get("/", (req, res) => {
  res.json({
    version: "1.0.1",
    author: "Steven Nizama",
    name: "API REST KANBAN",
  });
});
app.use("/api/v1/auth", authRouter);
app.use(handleAuth);
app.use("/api/v1/board", boardRouter);
app.use("/api/v1/list", listRouter);
app.use("/api/v1/card", cardRouter);

app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
  connectDB();
});
