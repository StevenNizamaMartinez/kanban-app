import { Router } from "express";
import { createCard, deleteCard, getCards, updateCard, updateCardPosition} from "../controllers/card.controller.js";

const cardRouter = Router();

cardRouter.get("/", getCards)
cardRouter.post("/", createCard)
cardRouter.put("/:id", updateCard)
cardRouter.put("/", updateCardPosition)
cardRouter.delete("/:id", deleteCard)

export default cardRouter
