import React from "react";
import { H2 } from "@/components/typography/h2";
import P from "@/components/typography/p";

const UeberunsSection = () => {
  return (
    <section className="py-12 px-4 md:px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <H2 className="text-3xl font-bold">Über unseren Verein</H2>
          <P className="text-slate-700">
            Erfahren Sie mehr über die Geschichte und Tradition unseres
            Karnevalsvereins.
          </P>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <img
              alt="Club History"
              className="rounded-lg aspect-[600/400] object-cover "
              height="400"
              src="https://www.knallkoepp-golkrath.de/s/img/emotionheader.jpg?1612271409.960px.300px"
              width="600"
            />
          </div>
          <div className="space-y-4">
            <P className="text-slate-700">
              Unser Karnevalsverein wurde 1972 gegründet und hat seitdem eine
              lange Tradition in der Region. Wir sind stolz darauf, die
              Karnevalskultur in unserer Gemeinschaft zu pflegen und
              weiterzugeben.
            </P>
            <P className="text-slate-700">
              Jedes Jahr organisieren wir eine Reihe von Veranstaltungen, um
              unsere Mitglieder und die Öffentlichkeit in den Karnevalsspaß
              einzubinden. Von Kostümfesten bis hin zu Umzügen bieten wir ein
              abwechslungsreiches Programm für Jung und Alt.
            </P>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UeberunsSection;
