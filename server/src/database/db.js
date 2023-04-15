import { connect } from "mongoose";
import { MONGO_URI } from "../libs/config.js";

export const connectDB = async () => {
  try {
    const conn = await connect(MONGO_URI)
    console.log(`MongoDB Connected: ${conn.connection.name}`)
  } catch (error) {
    console.error(error)
  }
}
