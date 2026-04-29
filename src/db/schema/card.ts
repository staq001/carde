import {
  mysqlTable,
  varchar,
  timestamp,
  int,
  boolean,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const cards = mysqlTable("cards", {
  id: varchar("id", { length: 36 })
    .primaryKey()
    .notNull()
    .default(sql`(uuid())`),
  name: varchar("name", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
});
