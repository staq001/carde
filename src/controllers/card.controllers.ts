import type { Response, Request, NextFunction } from "express";

import { CardService } from "@/services/card.service";
export class CardController {
  private cardService: CardService;

  constructor() {
    this.cardService = new CardService();
  }

  async createCard(req: Request, res: Response, next: NextFunction) {
    try {
      const card = await this.cardService.createCard(req.body);

      res.status(201).json({
        status: 201,
        message: "Card created successfully",
        data: card,
      });
    } catch (e) {
      next(e);
    }
  }

  async verifyCard(req: Request, res: Response, next: NextFunction) {
    try {
      const card = await this.cardService.verifyCard(req.body.id);

      res.status(200).json({
        status: 200,
        message: "Card verified successfully",
        data: card,
      });
    } catch (e) {
      next(e);
    }
  }
}
