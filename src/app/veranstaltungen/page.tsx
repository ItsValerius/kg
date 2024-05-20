import EventCard from "@/components/eventPage/eventCard";
import { H2 } from "@/components/typography/h2";
import P from "@/components/typography/p";
import { getActiveEvents } from "@/server/db/lib";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Veranstaltungen",
};

const VeranstaltungenPage = async () => {
  const events = await getActiveEvents();

  return (
    <main>
      <section className="px-4 py-12 md:px-6">
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="space-y-2 text-center">
            <H2>Bevorstehende Veranstaltungen</H2>
            <P>
              Erfahren Sie mehr über unsere kommenden Karnevalsfeierlichkeiten.
            </P>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => {
              return <EventCard event={event} key={event.id} />;
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default VeranstaltungenPage;
