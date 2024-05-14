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

import { ACCEPTED_IMAGE_TYPES } from "@/lib/z/schema";
import { insertEventSchema } from "@/server/db/schema";
import { cn, createSlug } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
export const DashboardFormEvents = () => {
  const timeSchema = z.object({ time: z.string().time({ precision: 0 }) });

  const formSchema = insertEventSchema.merge(timeSchema);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log({ values });
    // const formData = new FormData();
    // formData.append("file", values.file);
    // await uploadImage(formData);
  }

  const [content, setContent] = useState<JSONContent>(defaultValue);

  return (
    <div className="flex flex-col gap-2 overflow-x-scroll lg:overflow-auto">
      <Form {...form}>
        <form
          onSubmit={(e) => {
            form.setValue("description", generateHTML(content, [StarterKit]));
            form.setValue("slug", createSlug(form.getValues("name")));

            form
              .handleSubmit(onSubmit)(e)
              .catch((err) => console.log(err));
          }}
          className="flex flex-col gap-2 px-4 pb-2 md:flex-row lg:flex-row lg:pb-4"
          id="dashboardForm"
        >
          <div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Biwak..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Das ist der Name der Veranstaltung.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel>Eintrittspreis</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Preis..."
                      onChange={(event) =>
                        onChange(Number(event.currentTarget?.value))
                      }
                      {...field}
                      className="flex w-full flex-col justify-between"
                    />
                  </FormControl>
                  <FormDescription>
                    Das ist der Name der Veranstaltung.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel>Veranstaltungsdatum</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            " pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            new Intl.DateTimeFormat("de-DE", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }).format(field.value)
                          ) : (
                            <span>Termin...</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date: Date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Your date of birth is used to calculate your age.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="time"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel>Time</FormLabel>
                  <FormControl>
                    <Input
                      type="time"
                      onChange={(event) =>
                        onChange(event.currentTarget?.value + ":00")
                      }
                      placeholder="11:11"
                      {...field}
                      className="flex w-full flex-col justify-between"
                    />
                  </FormControl>
                  <FormDescription>
                    Das ist der Name der Veranstaltung.
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
              <FormItem className="flex flex-col gap-1">
                <FormLabel>Teaser</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Beste Veranstaltung in Erkelenz..."
                    className="flex-1"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Das ist der Teaser Text der Veranstaltung.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <Editor initialValue={content} onChange={setContent} />
      <Button form="dashboardForm" type="submit">
        Submit
      </Button>
    </div>
  );
};
