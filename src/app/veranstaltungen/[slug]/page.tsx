import { H1 } from "@/components/typography/h1";
import H3 from "@/components/typography/h3";
import H4 from "@/components/typography/h4";
import List from "@/components/typography/list";
import Muted from "@/components/typography/muted";
import P from "@/components/typography/p";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, EuroIcon } from "lucide-react";

const EventDetailPage = () => {
  return (
    <main className=" flex flex-col gap-4 py-4">
      <section className="py-12 px-4 md:px-6">
        <div className="max-w-5xl mx-auto space-y-8">
          <H4 className="text-center from-emerald-700 to-lime-200 bg-clip-text text-transparent bg-gradient-to-r">
            25. Februar 2023
          </H4>
          <H1 className="text-center text-balance">
            Kostümball - Feiern Sie den Höhepunkt der Karnevalssaison!
          </H1>
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="p-4 hover:shadow-lg duration-500 hover:shadow-emerald-600/60">
              <CardContent className="flex flex-col items-center gap-8">
                <Calendar className="stroke-emerald-600" size={48} />
                <div className="flex flex-col gap-2">
                  <Muted className="text-center ">Am</Muted>
                  <H4 className="text-center">25. Februar 2023</H4>
                  <Muted className="text-center "> Donnerstag</Muted>
                </div>
              </CardContent>
            </Card>
            <Card className="p-4 hover:shadow-lg duration-500 hover:shadow-emerald-600/60">
              <CardContent className="flex flex-col items-center gap-8">
                <Clock className="stroke-emerald-600" size={48} />
                <div className="flex flex-col gap-2">
                  <Muted className="text-center ">Ab</Muted>
                  <H4 className="text-center">19:00 Uhr</H4>
                  <Muted className="text-center ">Einlass</Muted>
                </div>
              </CardContent>
            </Card>
            <Card className="p-4 hover:shadow-lg duration-500 hover:shadow-emerald-600/60">
              <CardContent className="flex flex-col items-center gap-8">
                <EuroIcon className="stroke-emerald-600" size={48} />
                <div className="flex flex-col gap-2">
                  <Muted className="text-center">Preis</Muted>
                  <H4 className="text-center">5€</H4>
                  <Muted className="text-center ">/ Person</Muted>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <Separator className="my-4 max-w-5xl mx-auto" />
      <section className="py-6 px-2 md:px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          <H3>Besondere Acts und Highlights:</H3>
          <List className="mt-2">
            <li>Live-Auftritte von renommierten Karnevalsgruppen und Bands</li>
            <li>
              Spektakuläre Kostümwettbewerbe mit tollen Preisen für die
              kreativsten Verkleidungen
            </li>
            <li>
              Aufregende Tanzvorführungen und Mitmachaktionen für alle Gäste
            </li>
            <li>
              Überraschungsgäste und Special Performances im Laufe des Abends -
            </li>
            <li>
              Exklusive Fotoecke, um Ihre fantastischen Kostüme festzuhalten und
              Erinnerungen zu schaffen
            </li>
          </List>
          <Separator className="my-4 max-w-3xl mx-auto" />
          <H3>Veranstaltungsbeschreibung:</H3>
          Treten Sie ein in eine Welt voller Farben, Musik und Frohsinn und
          lassen Sie sich vom Flair des Karnevals verzaubern! Unser Kostümball
          verspricht eine unvergessliche Nacht voller Spaß und Unterhaltung.
          Tauchen Sie ein in unsere festlich geschmückte Location und erleben
          Sie die einzigartige Atmosphäre des Karnevals. Ob traditionell,
          originell oder extravagant - zeigen Sie Ihre besten Kostüme und feiern
          Sie mit uns bis in die frühen Morgenstunden!
          <Separator className="my-4 max-w-3xl mx-auto" />
          <H3>Anfahrt und Lage:</H3>
          Der Karnevalssaal "Festlicher Rausch" befindet sich in zentraler Lage
          in Köln und ist sowohl mit öffentlichen Verkehrsmitteln als auch mit
          dem Auto bequem zu erreichen. Kostenlose Parkplätze stehen in der Nähe
          zur Verfügung.
          <Separator className="my-4 max-w-3xl mx-auto" />
          <P>
            Sichern Sie sich noch heute Ihre Tickets für dieses spektakuläre
            Ereignis und seien Sie dabei, wenn wir den Höhepunkt der
            Karnevalssaison gebührend feiern! Wir freuen uns darauf, Sie auf
            unserem Kostümball begrüßen zu dürfen! Für weitere Informationen und
            Ticketbuchungen besuchen Sie bitte unsere Website oder kontaktieren
            Sie uns unter [Kontaktinformationen].
          </P>
        </div>
      </section>
    </main>
  );
};

export default EventDetailPage;
