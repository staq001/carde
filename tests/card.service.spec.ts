import { describe, it, expect, mock, beforeEach } from "bun:test";
import { CardService } from "../src/services/card.service";
import {
  BadRequest,
  Conflict,
  InternalServerError,
  NotFound,
} from "../src/utils/error";

let mockSelectResult: any[] = [];
let mockInsertResult = [{ affectedRows: 1 }];
let mockValidateResult = true;

mock.module("../src/db/mysql", () => ({
  db: {
    select: mock(() => ({
      from: mock(() => ({
        where: mock(() => Promise.resolve(mockSelectResult)),
      })),
    })),
    insert: mock(() => ({
      values: mock(() => Promise.resolve(mockInsertResult)),
    })),
  },
}));

mock.module("uuid", () => ({
  validate: mock(() => mockValidateResult),
}));

mock.module("../src/utils/logger", () => ({
  logger: {
    info: mock(() => {}),
    error: mock(() => {}),
  },
}));

describe("CardService", () => {
  let cardService: CardService;

  beforeEach(() => {
    cardService = new CardService();

    // reset mock-state
    mockSelectResult = [];
    mockInsertResult = [{ affectedRows: 1 }];
    mockValidateResult = true;
  });

  describe("createCard", () => {
    it("should create a card successfully when no existing card with same name", async () => {
      const newCard = { name: "Test Card", description: "A test card" };

      const result = await cardService.createCard(newCard);

      expect(result).toEqual({ values: newCard });
    });

    it("should throw Conflict error when card with same name exists", async () => {
      const newCard = { name: "Existing Card", description: "A test card" };

      mockSelectResult = [{ name: "Existing Card" }];

      await expect(cardService.createCard(newCard)).rejects.toThrow(Conflict);
    });

    it("should throw InternalServerError on insert failure", async () => {
      const newCard = { name: "Test Card", description: "A test card" };

      mockInsertResult = [{ affectedRows: 0 }];

      await expect(cardService.createCard(newCard)).rejects.toThrow(
        InternalServerError,
      );
    });
  });

  describe("verifyCard", () => {
    it("should return card when valid id and card exists", async () => {
      const cardId = "valid-uuid";
      const card = {
        id: cardId,
        name: "Test Card",
        description: "A test card",
      };

      mockSelectResult = [card];

      const result = await cardService.verifyCard(cardId);

      expect(result).toEqual(card);
    });

    it("should throw BadRequest for invalid uuid", async () => {
      const invalidId = "invalid-id";

      mockValidateResult = false;

      await expect(cardService.verifyCard(invalidId)).rejects.toThrow(
        BadRequest,
      );
    });

    it("should throw NotFound when card does not exist", async () => {
      const cardId = "valid-uuid";

      mockSelectResult = [];

      await expect(cardService.verifyCard(cardId)).rejects.toThrow(NotFound);
    });
  });
});
