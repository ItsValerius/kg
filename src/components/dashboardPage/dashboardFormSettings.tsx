"use client";
import { updateName, uploadAvatar } from "@/app/dashboard/settings/actions";
import { insertAccountSchema, type SelectAccount } from "@/server/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ReactCrop, { type Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const fileSchema = z.object({
  file: z
    .instanceof(File)
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      `File size should be less than 5mb.`,
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only these types are allowed .jpg, .jpeg, .png and .webp",
    )
    .optional(),
});
const formSchema = insertAccountSchema.merge(fileSchema);

const DashboardFormSettings = ({ account }: { account: SelectAccount }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: account.name,
    },
  });
  const [crop, setCrop] = useState<Crop>({
    unit: "px", // Can be 'px' or '%'
    x: 25,
    y: 25,
    width: 100,
    height: 100,
  });
  const [file, setFile] = useState<File | undefined>();

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    console.log(crop);
    if (values.file) {
      const formData = new FormData();
      formData.append("file", values.file);

      await uploadAvatar({
        x: crop.x,
        y: crop.y,
        h: crop.height,
        w: crop.width,
        accountId: values.id,
        formData,
      });
    }
    if (values.name !== account.name) {
      await updateName({ name: values.name, accountId: values.id });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={async (e) => {
          form.setValue("id", account.id);
          await form.handleSubmit(onSubmit)(e);
        }}
        className="flex flex-col gap-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="..." {...field} />
              </FormControl>
              <FormDescription>
                Das ist der angezeigte Name auf der Website.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem>
              <FormLabel>File</FormLabel>
              <FormControl>
                <Input
                  accept={ACCEPTED_IMAGE_TYPES.join(", ")}
                  type="file"
                  placeholder="Avatar"
                  {...field}
                  onChange={(event) => {
                    onChange(event.target?.files?.[0]);
                    setFile(event.target?.files?.[0]);
                  }}
                />
              </FormControl>
              <FormDescription>
                Das ist das dein Bild auf der Website, wenn du einen Artikel
                schreibst.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {file && (
          <ReactCrop
            crop={crop}
            onChange={(c) => setCrop(c)}
            circularCrop
            aspect={1}
          >
            {/*eslint-disable-next-line @next/next/no-img-element */}
            <img src={URL.createObjectURL(file)} alt="cropped image" />
          </ReactCrop>
        )}
        <Button type="submit">Speichern</Button>
      </form>
    </Form>
  );
};

export default DashboardFormSettings;
