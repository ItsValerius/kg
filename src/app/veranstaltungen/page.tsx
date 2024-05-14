import LinkWithIcon from "@/components/Links/LinkWithIcon";
import H3 from "@/components/typography/h3";
import P from "@/components/typography/p";
import { Card, CardContent } from "@/components/ui/card";
import { db } from "@/server/db";
import { eventsTable } from "@/server/db/schema";
import { gt } from "drizzle-orm";
import { CalendarDaysIcon, ChevronRightCircle } from "lucide-react";

const VeranstaltungenPage = async () => {
  const events = await db.query.eventsTable.findMany({
    where: gt(eventsTable.date, new Date()),
  });

  return (
    <main>
      <section className="px-4 py-12 md:px-6">
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold">
              Bevorstehende Veranstaltungen
            </h2>
            <p className="text-slate-700">
              Erfahren Sie mehr über unsere kommenden Karnevalsfeierlichkeiten.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => {
              return (
                <Card className="p-4 duration-500 hover:shadow-lg hover:shadow-emerald-600/60">
                  <CardContent className="grid h-full grid-rows-[32px_1fr_20px] gap-2 space-y-2">
                    <H3 className="text-xl font-bold">{event.name}</H3>
                    <P className="line-clamp-3 text-slate-700">
                      {event.teaser}
                    </P>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CalendarDaysIcon className="h-5 w-5 stroke-emerald-600" />
                        <span className="text-sm">
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
        </div>
      </section>
    </main>
  );
};

export default VeranstaltungenPage;
