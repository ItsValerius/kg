"use server";
import { db } from "@/server/db";
import { accountsTable } from "@/server/db/schema";
import { createClient } from "@/server/supabase/server";
import { eq } from "drizzle-orm";
import sharp from "sharp";
export const uploadAvatar = async ({
  x,
  y,
  w,
  h,
  accountId,
  formData,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  accountId: string;
  formData: FormData;
}) => {
  const supabase = createClient();
  console.log(formData);

  const file = formData.get("file") as File;

  if (!file) return false;
  const resized = await sharp(await file.arrayBuffer())
    .extract({ left: x, top: y, width: w, height: h })
    .webp()
    .toBuffer();
  console.log(resized);
  const bucket = "account_images";

  // Call Storage API to upload file
  const { data, error } = await supabase.storage
    .from(bucket)
    .update(accountId + ".webp", resized, {
      upsert: true,
      cacheControl: "3600",
    });
  if (data) {
    try {
      await db
        .update(accountsTable)
        .set({ imageUrl: data.path })
        .where(eq(accountsTable.id, accountId));
    } catch (err) {
      console.log(err);
    }
  }
  // Handle error if upload failed
  if (error) {
    console.log(error);

    console.log("Error uploading file.");
    return false;
  }

  console.log("File uploaded successfully!");
  return true;
};

export const updateName = async ({
  name,
  accountId,
}: {
  name: string;
  accountId: string;
}) => {
  try {
    await db
      .update(accountsTable)
      .set({ name })
      .where(eq(accountsTable.id, accountId));
  } catch (err) {
    console.log(err);
  }
};
