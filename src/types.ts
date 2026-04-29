import type { cards } from "@/db/schema";

type table = typeof cards;

export type Cards = typeof cards.$inferSelect;
export type NewCard = typeof cards.$inferInsert;

export type Table = table;
export type Values = NewCard | Cards;
