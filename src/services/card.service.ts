import { validate } from "uuid";
import { eq, getTableColumns } from "drizzle-orm";

import { db } from "@/db/mysql";
import { cards } from "@/db/schema";
import type { NewCard, Table, Values } from "@/types";
import {
  BadRequest,
  Conflict,
  InternalServerError,
  logger,
  NotFound,
} from "@/utils";

export class CardService {
  async createCard(card: NewCard) {
    try {
      const { name } = getTableColumns(cards);

      const [findCard] = await db
        .select({ name })
        .from(cards)
        .where(eq(cards.name, card.name));

      if (findCard) {
        throw new Conflict("Card with this name already exists");
      }

      const values = await this.insertWithContext(cards, card);
      logger.info("Card created successfully");

      return values;
    } catch (e: any) {
      logger.error(`Error creating card...${e}`);
      throw new InternalServerError(`Error creating user`);
    }
  }

  async verifyCard(cardId: string) {
    try {
      if (!validate(cardId)) {
        throw new BadRequest("Invalid card ID format");
      }

      const { id, name, description } = getTableColumns(cards);

      const [card] = await db
        .select({ id, name, description })
        .from(cards)
        .where(eq(cards.id, cardId));

      if (!card) {
        throw new NotFound("card not found");
      }

      logger.info("Card verified successfully");
      return card;
    } catch (e: any) {
      logger.error(`Error verifying card...${e}`);
      if (e instanceof NotFound) throw e;
      if (e instanceof BadRequest) throw e;
      throw new InternalServerError(`Error verifying card`);
    }
  }

  private async insertWithContext(table: Table, values: Values) {
    try {
      const [result] = await db.insert(table).values(values);

      if (!result || result.affectedRows !== 1) {
        throw new InternalServerError("Failed to insert card");
      }

      return { values };
    } catch (e: any) {
      throw e;
    }
  }
}
