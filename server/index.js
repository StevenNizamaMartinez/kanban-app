import app from "./app.js";
import { connectDB } from "./database/db.js";
import { PORT } from "./libs/config.js";
import { handleAuth } from "./middlewares/auth.middleware.js";
import authRouter from "./routes/auth.routes.js";
import boardRouter from "./routes/board.routes.js";
import cardRouter from "./routes/card.routes.js";
import listRouter from "./routes/list.routes.js";

app.set("port", PORT);

// ROUTES
app.use("/api/v1/auth", authRouter);
app.use(handleAuth);
app.use("/api/v1/board", boardRouter);
app.use("/api/v1/list", listRouter);
app.use("/api/v1/card", cardRouter);

app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
  connectDB();
});
