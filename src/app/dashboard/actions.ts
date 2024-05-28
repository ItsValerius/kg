"use server";

import { db } from "@/server/db";
import {
  type InsertEvent,
  type InsertPost,
  eventsTable,
  postsTable,
} from "@/server/db/schema";
import { createClient } from "@/server/supabase/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const uploadImage = async (formData: FormData) => {
  const supabase = createClient();

  const file = formData.get("file") as File;
  const name = formData.get("name")?.toString();

  if (!file || !name) return;

  const bucket = "article_images";

  // Call Storage API to upload file
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(name, file);
  console.log(data);

  // Handle error if upload failed
  if (error) {
    console.log(error);

    console.log("Error uploading file.");
    return;
  }

  console.log("File uploaded successfully!");
};

export const insertEvent = async (values: InsertEvent) => {
  const { price } = values;
  let priceInCents = 0;
  if (price) priceInCents = price * 100;
  if (values.id) {
    await db
      .update(eventsTable)
      .set({ ...values, price: priceInCents })
      .where(eq(eventsTable.id, values.id));
    revalidatePath("/veranstaltungen");

    return;
  }

  await db.insert(eventsTable).values({ ...values, price: priceInCents });
  revalidatePath("/veranstaltungen");
  return;
};

export const insertNews = async (values: InsertPost) => {
  if (values.id) {
    await db.update(postsTable).set(values).where(eq(postsTable.id, values.id));
  }
  await db.insert(postsTable).values(values);
  revalidatePath("/aktuelles");
  return;
};

export const updateStatus = async (
  id: number,
  status: "active" | "draft" | "inactive",
  isPost: boolean,
) => {
  if (isPost) {
    await db
      .update(postsTable)
      .set({ status: status })
      .where(eq(postsTable.id, id));
    revalidatePath("/aktuelles");
    revalidatePath("/dashboard/aktuelles");
    return;
  }
  await db
    .update(eventsTable)
    .set({ status: status })
    .where(eq(eventsTable.id, id));
  revalidatePath("/veranstaltungen");
  revalidatePath("/dashboard/veranstaltungen");
};
