import { Router } from "express";
import { getBoards,createBoard, updateBoard, deleteBoard } from "../controllers/board.controller.js";

const boardRouter = Router();

boardRouter.get("/", getBoards)
boardRouter.post("/", createBoard)
boardRouter.patch("/:id",updateBoard)
boardRouter.delete("/:id",deleteBoard)

export default boardRouter
