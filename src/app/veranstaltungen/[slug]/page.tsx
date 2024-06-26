import LinkWithUnderline from "@/components/Links/LinkWithUnderline";
import { H1 } from "@/components/typography/h1";
import H4 from "@/components/typography/h4";
import Muted from "@/components/typography/muted";
import Small from "@/components/typography/small";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { db } from "@/server/db";
import { eventsTable } from "@/server/db/schema";
import { and, eq } from "drizzle-orm";
import { Calendar, ChevronLeftCircle, Clock, EuroIcon } from "lucide-react";
import { notFound } from "next/navigation";
import parse from "html-react-parser";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props) {
  const event = await db.query.eventsTable.findFirst({
    where: and(
      eq(eventsTable.slug, params.slug),
      eq(eventsTable.status, "active"),
    ),
  });
  return {
    title: event?.name,
  };
}

const EventDetailPage = async ({ params }: { params: { slug: string } }) => {
  const event = await db.query.eventsTable.findFirst({
    where: and(
      eq(eventsTable.slug, params.slug),
      eq(eventsTable.status, "active"),
    ),
  });

  if (!event) return notFound();

  return (
    <main className=" flex flex-col gap-4 py-4">
      <div className="absolute p-4">
        <LinkWithUnderline
          href="/veranstaltungen"
          spanClassName="flex items-center gap-1 pb-1 "
        >
          <ChevronLeftCircle size={16} className="stroke-primary" />
          <Small className="sm:text-lg">Alle Veranstaltungen</Small>
        </LinkWithUnderline>
      </div>
      <section className="px-4 py-12 md:px-6">
        <div className="mx-auto max-w-5xl space-y-8">
          <H4 className="bg-gradient-to-r from-primary to-lime-200 dark:from-primary dark:to-background bg-clip-text text-center text-transparent">
            {new Intl.DateTimeFormat("de-DE", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(event.date)}
          </H4>
          <H1 className="text-balance text-center">{event.name}</H1>
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="p-4 duration-500 hover:shadow-md hover:shadow-primary/60">
              <CardContent className="flex flex-col items-center gap-8">
                <Calendar className="stroke-primary" size={48} />
                <div className="flex flex-col gap-2">
                  <Muted className="text-center ">Am</Muted>
                  <H4 className="text-center">
                    {" "}
                    {new Intl.DateTimeFormat("de-DE", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }).format(event.date)}
                  </H4>
                  <Muted className="text-center ">
                    {" "}
                    {new Intl.DateTimeFormat("de-DE", {
                      weekday: "long",
                    }).format(event.date)}
                  </Muted>
                </div>
              </CardContent>
            </Card>
            <Card className="p-4 duration-500 hover:shadow-md hover:shadow-primary/60">
              <CardContent className="flex flex-col items-center gap-8">
                <Clock className="stroke-primary" size={48} />
                <div className="flex flex-col gap-2">
                  <Muted className="text-center ">Ab</Muted>
                  <H4 className="text-center">
                    {" "}
                    {new Intl.DateTimeFormat("de-DE", {
                      hour: "2-digit",
                      minute: "2-digit",
                      timeZone:"Europe/Berlin"
                    }).format(event.date)}
                  </H4>
                  <Muted className="text-center ">Einlass</Muted>
                </div>
              </CardContent>
            </Card>
            <Card className="p-4 duration-500 hover:shadow-md hover:shadow-primary/60">
              <CardContent className="flex flex-col items-center gap-8">
                <EuroIcon className="stroke-primary" size={48} />
                <div className="flex flex-col gap-2">
                  {event.price !== 0 ? (
                    <>
                      <Muted className="text-center">Preis</Muted>
                      <H4 className="text-center">
                        {new Intl.NumberFormat("de-DE", {
                          style: "currency",
                          currency: "EUR",
                          notation: "standard",
                        }).format(event.price / 100)}
                      </H4>
                      <Muted className="text-center ">/ Person</Muted>
                    </>
                  ) : (
                    <>
                      <Muted className="text-center">Eintritt</Muted>
                      <H4 className="text-center">Kostenlos </H4>
                      <Muted className="h-6 text-center">{""}</Muted>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <Separator className="mx-auto my-4 max-w-5xl" />
      <section className="px-2 py-6 md:px-4">
        <div className="mx-auto flex max-w-5xl justify-center">
          <CardContent className="prose dark:prose-invert">
            {parse(event.description)}
          </CardContent>
        </div>
      </section>
    </main>
  );
};

export default EventDetailPage;
