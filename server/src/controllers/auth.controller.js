import { SECRET } from "../libs/config.js";
import userModel from "../models/user.model.js";
import jsonwebtoken from "jsonwebtoken";
import cookie from "cookie";

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "All fields are required" });
  try {
    const userDb = await userModel.findOne({ email });
    if (!userDb) return res.status(404).json({ message: "User not found" });
    const compare = await userModel.verifyPassword(password, userDb.password)
    if (!compare)
      return res.status(400).json({ message: "Incorrect password" });
    const token = jsonwebtoken.sign({userDb}, SECRET, {
      expiresIn: 60 * 60 * 24, // 24 hours
    });
    const serialized = cookie.serialize("token", token);
    res.cookie("token",serialized,{
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 1000 * 30,
      path: "/",
      // secure: true, // Solo se establecerá en conexiones HTTPS
      sameSite: "none", // Configuración de SameSite en None
      maxAge: 1000 * 60 * 60 * 24,
      domain: "kanban-api-lovat.vercel.app", //   
    })
    res.send({token,userDb})
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDb = await userModel.findOne({email});
    if (userDb) return res.status(400).json({ message: "User already exists" });
    const encryptedPassword = await userModel.encryptPassword(password);
    const newUser = new userModel({ name, email, password:encryptedPassword });
    const user = await newUser.save();
    const token = jsonwebtoken.sign({user}, SECRET, {
      expiresIn: 60 * 60 * 24, // 24 hours
    });
    const serialized = cookie.serialize("token", token);
    res.cookie("token",serialized,{
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 1000 * 30,
      path: "/",
      // secure: true, // Solo se establecerá en conexiones HTTPS
      sameSite: "none", // Configuración de SameSite en None
      maxAge: 1000 * 60 * 60 * 24,
      domain: "kanban-api-lovat.vercel.app", // Dominio del servidor sin http o https
    })
    res.send({token,userDb})
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const logout = async (req, res) => {
try {
  res.clearCookie("token");
  res.send("Logged out");
} catch (error) {
  res.status(500).json({ message: error });
}

}
