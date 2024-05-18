import EventCard from "@/components/eventPage/eventCard";
import { getActiveEvents } from "@/server/db/lib";

const VeranstaltungenPage = async () => {
  const events = await getActiveEvents();

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
              return <EventCard event={event} key={event.id} />;
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default VeranstaltungenPage;
