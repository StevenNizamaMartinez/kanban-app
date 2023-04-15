import cookie from "cookie"
import jwt from "jsonwebtoken"
import { SECRET } from "../libs/config.js";

export const handleAuth = async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies.token) return res.status(403).json({ message: "Unauthorized" });
  const {token} = cookie.parse(cookies.token)
  if (!token) return res.status(403).json({ message: "Unauthorized" });
  const verify = jwt.verify(token,SECRET)
  if (!verify) return res.status(403).json({ message: "Unauthorized" });
  res.locals.data = verify
  next();
}
