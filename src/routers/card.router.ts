import { Router } from "express";

import { validate } from "@/middleware/errorHandler";
import { CardController } from "@/controllers/card.controllers";
import { createCardSchema, verifyCardSchema } from "@/schema/card.schema";

const cardRouter = Router();
const cardController = new CardController();

cardRouter.post(
  "/",
  validate(createCardSchema),
  cardController.createCard.bind(cardController),
);

cardRouter.post(
  "/verify",
  validate(verifyCardSchema),
  cardController.verifyCard.bind(cardController),
);

export default cardRouter;
