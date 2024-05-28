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

import { generateHTML, generateJSON } from "@tiptap/html";
import { StarterKit } from "novel/extensions";
import { Textarea } from "../ui/textarea";

import { insertEvent } from "@/app/dashboard/actions";
import { cn, createSlug } from "@/lib/utils";
import { insertEventSchema, type SelectEvent } from "@/server/db/schema";
import { CalendarIcon } from "lucide-react";
import { toast } from "sonner";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
export const DashboardFormEvents = ({ event }: { event?: SelectEvent }) => {
  const timeSchema = z.object({ time: z.string().time({ precision: 0 }) });

  const formSchema = insertEventSchema.merge(timeSchema);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...(event ?? { name: "" }),
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [hours, minutes, _seconds] = values.time.split(":");
    values.date.setHours(Number(hours));
    values.date.setMinutes(Number(minutes));
    
    try {
      await insertEvent(values);
    } catch (err) {
      return;
    }
    toast("Event wurde erstellt.", {
      description: "Das Event " + values.name + " wurde erfolgreich erstellt.",
    });
    // const formData = new FormData();
    // formData.append("file", values.file);
    // await uploadImage(formData);
  }

  const [content, setContent] = useState<JSONContent>(
    event ? generateJSON(event.description, [StarterKit]) : defaultValue,
  );
  const [price, setPrice] = useState<number>(event ? event.price / 100 : 0);
  const [time, setTime] = useState<string>(
    event?.date.getHours().toString() +
      ":" +
      event?.date.getMinutes().toString() +
      ":00",
  );
  return (
    <div className="flex flex-col gap-2 overflow-x-scroll lg:overflow-auto">
      <Form {...form}>
        <form
          onSubmit={async (e) => {
            form.setValue("description", generateHTML(content, [StarterKit]));
            form.setValue("slug", createSlug(form.getValues("name")));
            form.setValue("time", time);
            form.setValue("price", price);

            await form.handleSubmit(onSubmit)(e);
          }}
          className="flex flex-col gap-2 p-4 md:grid md:grid-cols-3 "
          id="dashboardForm"
        >
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1 space-y-0">
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
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem className="flex flex-col gap-1 space-y-0">
                  <FormLabel>Eintrittspreis</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Preis..."
                      onChange={(event) => {
                        onChange(Number(event.currentTarget?.value));
                        setPrice(Number(event.currentTarget?.value));
                      }}
                      {...field}
                      value={price}
                      step={0.1}
                      className="flex w-full flex-col justify-between"
                    />
                  </FormControl>
                  <FormDescription>
                    Das ist der Eintrittspreis der Veranstaltung.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1 space-y-0">
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
                        required
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Das ist das Datum der Veranstaltung
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="time"
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem className="flex flex-col gap-1 space-y-0">
                  <FormLabel>Uhrzeit</FormLabel>
                  <FormControl>
                    <Input
                      type="time"
                      required
                      onChange={(event) => {
                        onChange(event.currentTarget?.value + ":00");
                        setTime(event.currentTarget?.value + ":00");
                      }}
                      placeholder="11:11"
                      value={time}
                      {...field}
                      className="flex w-full flex-col justify-between"
                    />
                  </FormControl>
                  <FormDescription>
                    Das ist der Uhrzeit der Veranstaltung.
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
              <FormItem className="flex flex-col gap-1 space-y-0">
                <FormLabel>Teaser</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Beste Veranstaltung in Erkelenz..."
                    required
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
