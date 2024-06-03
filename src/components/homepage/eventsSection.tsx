import P from "@/components/typography/p";
import { getActiveEvents } from "@/server/db/lib";
import { ChevronRightCircle } from "lucide-react";
import LinkWithUnderline from "../Links/LinkWithUnderline";
import EventCard from "../eventPage/eventCard";
import { H2 } from "../typography/h2";
import Small from "../typography/small";
const EventsSection = async () => {
  const events = await getActiveEvents(3);
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
        <div className="grid min-h-48 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => {
            return <EventCard event={event} key={event.id} />;
          })}
        </div>
        <LinkWithUnderline
          href="/veranstaltungen"
          className="self-end"
          spanClassName=" flex items-center gap-1 pb-1"
        >
          <Small className="text-foreground">Alle Veranstaltungen</Small>
          <ChevronRightCircle size={16} className="stroke-primary" />
        </LinkWithUnderline>
      </div>
    </section>
  );
};

export default EventsSection;
