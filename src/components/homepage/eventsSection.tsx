import H3 from "@/components/typography/h3";
import P from "@/components/typography/p";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDaysIcon, ChevronRightCircle } from "lucide-react";
import LinkWithIcon from "../Links/LinkWithIcon";
import LinkWithUnderline from "../Links/LinkWithUnderline";
import Small from "../typography/small";
import { db } from "@/server/db";
import { eventsTable } from "@/server/db/schema";
import { gt } from "drizzle-orm";
import { H2 } from "../typography/h2";
const EventsSection = async () => {
  const events = await db.query.eventsTable.findMany({
    where: gt(eventsTable.date, new Date()),
    limit: 3,
  });

  if (events.length < 1) {
    return;
  }

  return (
    <section className="px-4 py-12 md:px-6 ">
      <div className="mx-auto flex max-w-5xl flex-col space-y-8">
        <div className="space-y-2 text-center">
          <H2>Bevorstehende Veranstaltungen</H2>
          <P>
            Erfahren Sie mehr über unsere kommenden Karnevalsfeierlichkeiten.
          </P>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => {
            return (
              <Card
                className="p-4 duration-500 hover:shadow-lg hover:shadow-emerald-600/60"
                key={event.id}
              >
                <CardContent className="grid h-full grid-rows-[32px_1fr_20px] gap-2 space-y-2">
                  <H3 className="text-xl font-bold">{event.name}</H3>
                  <P className="text-slate-700">{event.teaser}</P>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CalendarDaysIcon className="h-5 w-5 stroke-emerald-600" />
                      <span className="text-sm">
                        {" "}
                        {new Intl.DateTimeFormat("de-DE", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }).format(event.date)}
                      </span>
                    </div>
                    <LinkWithIcon
                      href={`/veranstaltungen/${event.slug}`}
                      Icon={ChevronRightCircle}
                      iconClassName="stroke-emerald-600"
                    />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        <LinkWithUnderline
          href="/veranstaltungen"
          className="self-end"
          spanClassName=" flex items-center gap-1 pb-1"
        >
          <Small>Alle Veranstaltungen</Small>
          <ChevronRightCircle size={16} className="stroke-emerald-600" />
        </LinkWithUnderline>
      </div>
    </section>
  );
};

export default EventsSection;
