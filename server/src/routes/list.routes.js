import { Router } from "express";
import { createList, deleteList, getLists, updateList } from "../controllers/list.controller.js";

const listRouter = Router();

listRouter.get("/", getLists)
listRouter.post("/", createList)
listRouter.patch("/:id", updateList)
listRouter.delete("/:id", deleteList)

export default listRouter
