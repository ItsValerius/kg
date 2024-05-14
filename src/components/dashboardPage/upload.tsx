"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Editor from "@/components/editor/Editor";
import { defaultValue } from "@/components/editor/defaultValue";
import { type JSONContent } from "novel";
import { useState } from "react";

import { generateHTML } from "@tiptap/html";
import { StarterKit } from "novel/extensions";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const MAX_FILE_SIZE = 5000000;

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  teaser: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  file: z
    .instanceof(File)
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      `File size should be less than 5mb.`,
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only these types are allowed .jpg, .jpeg, .png and .webp",
    ),
  content: z.string().min(50),
});

export const Upload = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      teaser: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const { title, content, teaser } = values;
    console.log({ title, content, teaser });
    // const formData = new FormData();
    // formData.append("file", values.file);
    // await uploadImage(formData);
  }

  const [content, setContent] = useState<JSONContent>(defaultValue);

  return (
    <div className="overflow-x-scroll lg:overflow-auto">
      <Form {...form}>
        <form
          onSubmit={(e) => {
            form.setValue("content", generateHTML(content, [StarterKit]));
            form
              .handleSubmit(onSubmit)(e)
              .catch((err) => console.log(err));
          }}
          className="flex flex-col gap-2 pb-2 lg:flex-row lg:pb-4"
          id="articleForm"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="teaser"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teaser</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="file"
            render={({ field: { value, onChange, ...field } }) => (
              <FormItem>
                <FormLabel>File</FormLabel>
                <FormControl>
                  <Input
                    accept={ACCEPTED_IMAGE_TYPES.join(", ")}
                    type="file"
                    placeholder="shadcn"
                    {...field}
                    onChange={(event) => onChange(event.target?.files?.[0])}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <Editor initialValue={content} onChange={setContent} />
      <Button form="articleForm" type="submit">
        Submit
      </Button>
    </div>
  );
};
