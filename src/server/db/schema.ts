// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  pgTableCreator,
  primaryKey,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `kg_${name}`);

export const usersTable = pgTable("users_table", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  age: integer("age").notNull(),
  email: text("email").notNull().unique(),
});
export const postsTable = pgTable("posts_table", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  // image: text("image").notNull(),
  teaser: text("teaser").notNull(),
  content: text("content").notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const usersRelations = relations(usersTable, ({ many }) => ({
  posts: many(postsTable),
}));

export const postsRelations = relations(postsTable, ({ many, one }) => ({
  categoriesToPosts: many(categoriesToPostsTable),
  author: one(usersTable, {
    fields: [postsTable.userId],
    references: [usersTable.id],
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

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;
export type InsertPost = typeof postsTable.$inferInsert;
export type SelectPost = typeof postsTable.$inferSelect;
export type InsertCategory = typeof categoriesTable.$inferInsert;
export type SelectCategory = typeof categoriesTable.$inferSelect;
