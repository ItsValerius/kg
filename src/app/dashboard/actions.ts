"use server";

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
