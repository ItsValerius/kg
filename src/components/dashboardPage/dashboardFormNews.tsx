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
import { Textarea } from "../ui/textarea";

import { insertNews, uploadImage } from "@/app/dashboard/actions";
import { createSlug } from "@/lib/utils";
import { type SelectPost, insertPostSchema } from "@/server/db/schema";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Link } from "lucide-react";
import { toast } from "sonner";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const DashboardFormNews = ({
  userId,
  post,
}: {
  userId: string;
  post?: SelectPost;
}) => {
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
  const formSchema = insertPostSchema.merge(fileSchema);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...(post ?? { title: "" }),
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    const { title, content, teaser, slug, userId } = values;
    console.log({ title, content, teaser });
    try {
      if (values.file) {
        const formData = new FormData();
        formData.append("file", values.file);
        formData.append("name", slug);
        await uploadImage(formData);
      }
      await insertNews({ title, content, teaser, slug, userId });
    } catch (err) {
      console.log(err);
      return;
    }
    toast("Artikel wurde erstellt.", {
      description: "Der Artikel " + title + " wurde erfolgreich erstellt.",
    });
  }

  const [content, setContent] = useState<JSONContent>(defaultValue);
  const router = useRouter();

  return (
    <div className="flex flex-col gap-2 overflow-x-scroll lg:overflow-auto">
      <Form {...form}>
        <form
          onSubmit={async (e) => {
            form.setValue("content", generateHTML(content, [StarterKit]));
            form.setValue("userId", userId);
            form.setValue("slug", createSlug(form.getValues("title")));
            await form.handleSubmit(onSubmit)(e);
          }}
          className="flex grid-cols-2 flex-col gap-2 p-4 md:grid "
          id="dashboardForm"
        >
          <div className="flex flex-col justify-between gap-1 space-y-0">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titel</FormLabel>
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
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
          </div>
          <FormField
            control={form.control}
            name="teaser"
            render={({ field }) => (
              <FormItem className="flex flex-col ">
                <FormLabel>Teaser</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="flex-1"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  You can <span>@mention</span> other users and organizations.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
        <Editor initialValue={content} onChange={setContent} />
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
};
