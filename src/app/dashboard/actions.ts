"use server";

import { db } from "@/server/db";
import {
  type InsertEvent,
  type InsertPost,
  eventsTable,
  postsTable,
} from "@/server/db/schema";
import { createClient } from "@/server/supabase/server";
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
  await db.insert(eventsTable).values({ ...values, price: priceInCents });
  revalidatePath("/veranstaltungen");
  return;
};

export const insertNews = async (values: InsertPost) => {
  await db.insert(postsTable).values(values).returning();
  revalidatePath("/aktuelles");
  return;
};
