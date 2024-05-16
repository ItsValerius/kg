"use server";

import { db } from "@/server/db";
import { InsertEvent, eventsTable } from "@/server/db/schema";
import { createClient } from "@/server/supabase/server";

export const uploadImage = async (formData: FormData) => {
  const supabase = createClient();

  const file = formData.get("file") as File;
  if (!file) return;

  const bucket = "article_images";

  if (!file) return;
  const name = "test2";
  // Call Storage API to upload file
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(name.split(" ").join("-"), file);
  console.log(data);

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl("test");
  console.log(publicUrl);

  // Handle error if upload failed
  if (error) {
    console.log(error);

    console.log("Error uploading file.");
    return;
  }

  console.log("File uploaded successfully!");
};

export const insertEvent = async (values: InsertEvent) => {
  console.log(values);
  
  const { price } = values;
  let priceInCents = 0;
  if (price) priceInCents = price * 100;
  return await db
    .insert(eventsTable)
    .values({ ...values, price: priceInCents });
};