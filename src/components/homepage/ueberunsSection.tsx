import { H2 } from "@/components/typography/h2";
import P from "@/components/typography/p";
import Image from "next/image";

const UeberunsSection = () => {
  return (
    <section className="px-4 py-12 md:px-6">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="space-y-2 text-center">
          <H2 className="text-3xl font-bold">Über unseren Verein</H2>
          <P className="text-slate-700">
            Erfahren Sie mehr über die Geschichte und Tradition unseres
            Karnevalsvereins.
          </P>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <Image
              alt="Club History"
              className="aspect-[600/400] rounded-lg object-cover "
              height="400"
              src="https://knallkoepp-golkrath.de/s/img/emotionheader.jpg"
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
