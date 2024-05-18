// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgSchema,
  pgTable,
  pgTableCreator,
  primaryKey,
  serial,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */

export const createTable = pgTableCreator((name) => `kg_${name}`);

const authSchema = pgSchema("auth");

export const usersTable = authSchema.table("users", {
  id: uuid("id").primaryKey(),
});

export const accountsTable = pgTable("accounts_table", {
  id: uuid("id")
    .primaryKey()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  imageUrl: text("image_url").notNull(),
});

export const statusEnum = pgEnum("status", ["draft", "active", "inactive"]);

export const postsTable = pgTable("posts_table", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  teaser: text("teaser").notNull(),
  status: statusEnum("status").notNull().default("draft"),
  content: text("content").notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => accountsTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const accountsRelations = relations(accountsTable, ({ many }) => ({
  posts: many(postsTable),
}));

export const postsRelations = relations(postsTable, ({ many, one }) => ({
  categoriesToPosts: many(categoriesToPostsTable),
  author: one(accountsTable, {
    fields: [postsTable.userId],
    references: [accountsTable.id],
  }),
}));

export const categoriesTable = pgTable("categories_table", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

export const categoriesRelations = relations(categoriesTable, ({ many }) => ({
  categoriesToPosts: many(categoriesToPostsTable),
}));

export const categoriesToPostsTable = pgTable(
  "categories_to_posts_table",
  {
    categorieId: integer("categorie_id")
      .notNull()
      .references(() => categoriesTable.id, { onDelete: "cascade" }),
    postId: integer("post_id")
      .notNull()
      .references(() => postsTable.id, { onDelete: "cascade" }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.categorieId, t.postId] }),
  }),
);

export const categoriesToPostsRelations = relations(
  categoriesToPostsTable,
  ({ one }) => ({
    category: one(categoriesTable, {
      fields: [categoriesToPostsTable.categorieId],
      references: [categoriesTable.id],
    }),
    post: one(postsTable, {
      fields: [categoriesToPostsTable.postId],
      references: [postsTable.id],
    }),
  }),
);

export const eventsTable = pgTable("events_table", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  date: timestamp("date").notNull(),
  status: statusEnum("status").notNull().default("draft"),
  slug: text("slug").notNull().unique(),
  teaser: text("teaser").notNull(),
  price: integer("price").notNull().default(0),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export type InsertAccount = typeof accountsTable.$inferInsert;
export type SelectAccount = typeof accountsTable.$inferSelect;
export type InsertPost = typeof postsTable.$inferInsert;
export type SelectPost = typeof postsTable.$inferSelect;
export type SelectPostWithAccountAndCategory =
  typeof postsTable.$inferSelect & {
    author: SelectAccount;
    categoriesToPosts: SelectCategoryToPostsWithCategory[];
  };
export type InsertCategory = typeof categoriesTable.$inferInsert;
export type SelectCategory = typeof categoriesTable.$inferSelect;
export type InsertEvent = typeof eventsTable.$inferInsert;
export type SelectEvent = typeof eventsTable.$inferSelect;

export type InsertCategoryToPosts = typeof categoriesToPostsTable.$inferInsert;
export type SelectCategoryToPosts = typeof categoriesToPostsTable.$inferSelect;

export type InsertCategoryToPostsWithCategory =
  typeof categoriesToPostsTable.$inferInsert & { category: InsertCategory };
export type SelectCategoryToPostsWithCategory =
  typeof categoriesToPostsTable.$inferSelect & { category: SelectCategory };

export const insertAccountSchema = createInsertSchema(accountsTable);
export const insertPostSchema = createInsertSchema(postsTable);
export const insertEventSchema = createInsertSchema(eventsTable);
