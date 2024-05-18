import { and, asc, desc, eq, gt } from "drizzle-orm";
import { db } from ".";
import { eventsTable, postsTable } from "./schema";

export const getActivePosts = async (limit?: number) => {
  return await db.query.postsTable.findMany({
    with: { author: true, categoriesToPosts: { with: { category: true } } },
    where: eq(postsTable.status, "active"),
    orderBy: desc(postsTable.createdAt),
    limit: limit,
  });
};

export const getActiveEvents = async (limit?: number) => {
  return await db.query.eventsTable.findMany({
    where: and(
      gt(eventsTable.date, new Date()),
      eq(eventsTable.status, "active"),
    ),
    orderBy: asc(eventsTable.date),
    limit: limit,
  });
};
