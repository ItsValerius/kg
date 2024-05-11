import LinkWithIcon from "@/components/Links/LinkWithIcon";
import H3 from "@/components/typography/h3";
import P from "@/components/typography/p";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDaysIcon, ChevronRightCircle } from "lucide-react";

const VeranstaltungenPage = () => {
  return (
    <main>
      <section className="py-12 px-4 md:px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">Bevorstehende Veranstaltungen</h2>
          <p className="text-slate-700">
            Erfahren Sie mehr über unsere kommenden Karnevalsfeierlichkeiten.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="p-4 hover:shadow-lg duration-500 hover:shadow-emerald-600/60">
            <CardContent className="space-y-2 h-full grid grid-rows-[32px_1fr_20px] gap-2">
              <H3 className="text-xl font-bold">Kostümball</H3>
              <P className="text-slate-700">
                Feiern Sie mit uns den Höhepunkt der Karnevalssaison in
                aufwendigen Kostümen.
              </P>
              <div className="flex items-center justify-between">
                <div className="flex space-x-2 items-center">
                  <CalendarDaysIcon className="h-5 w-5 stroke-emerald-600" />
                  <span className="text-sm">25. Februar 2023</span>
                </div>
                <LinkWithIcon href="#" Icon={ChevronRightCircle} />
              </div>
            </CardContent>
          </Card>
          <Card className="p-4 hover:shadow-lg duration-500 hover:shadow-emerald-600/60">
            <CardContent className="space-y-2 h-full grid grid-rows-[32px_1fr_20px] gap-2">
              <H3 className="text-xl font-bold">Kinderkarneval</H3>
              <P className="text-slate-700">
                Lassen Sie Ihre Kinder in die bunte Welt des Karnevals
                eintauchen.
              </P>
              <div className="flex items-center justify-between">
                <div className="flex space-x-2 items-center">
                  <CalendarDaysIcon className="h-5 w-5 stroke-emerald-600" />
                  <span className="text-sm">11. März 2023</span>
                </div>
                <LinkWithIcon href="#" Icon={ChevronRightCircle} />
              </div>
            </CardContent>
          </Card>
          <Card className="p-4 hover:shadow-lg duration-500 hover:shadow-emerald-600/60">
            <CardContent className="space-y-2  h-full grid grid-rows-[32px_1fr_20px] gap-2">
              <H3 className="text-xl font-bold">Rosenmontagszug</H3>
              <P className="text-slate-700">
                Genießen Sie den traditionellen Höhepunkt des Karnevals mit
                bunten Umzügen.
              </P>
              <div className="flex items-center justify-between">
                <div className="flex space-x-2 items-center">
                  <CalendarDaysIcon className="h-5 w-5 stroke-emerald-600" />
                  <span className="text-sm">20. Februar 2023</span>
                </div>
                <LinkWithIcon href="#" Icon={ChevronRightCircle} />
              </div>
            </CardContent>
          </Card>
          <Card className="p-4 hover:shadow-lg duration-500 hover:shadow-emerald-600/60">
            <CardContent className="space-y-2 h-full grid grid-rows-[32px_1fr_20px] gap-2">
              <H3 className="text-xl font-bold">Kostümball</H3>
              <P className="text-slate-700">
                Feiern Sie mit uns den Höhepunkt der Karnevalssaison in
                aufwendigen Kostümen.
              </P>
              <div className="flex items-center justify-between">
                <div className="flex space-x-2 items-center">
                  <CalendarDaysIcon className="h-5 w-5 stroke-emerald-600" />
                  <span className="text-sm">25. Februar 2023</span>
                </div>
                <LinkWithIcon href="#" Icon={ChevronRightCircle} />
              </div>
            </CardContent>
          </Card>
          <Card className="p-4 hover:shadow-lg duration-500 hover:shadow-emerald-600/60">
            <CardContent className="space-y-2 h-full grid grid-rows-[32px_1fr_20px] gap-2">
              <H3 className="text-xl font-bold">Kinderkarneval</H3>
              <P className="text-slate-700">
                Lassen Sie Ihre Kinder in die bunte Welt des Karnevals
                eintauchen.
              </P>
              <div className="flex items-center justify-between">
                <div className="flex space-x-2 items-center">
                  <CalendarDaysIcon className="h-5 w-5 stroke-emerald-600" />
                  <span className="text-sm">11. März 2023</span>
                </div>
                <LinkWithIcon href="#" Icon={ChevronRightCircle} />
              </div>
            </CardContent>
          </Card>
          <Card className="p-4 hover:shadow-lg duration-500 hover:shadow-emerald-600/60">
            <CardContent className="space-y-2  h-full grid grid-rows-[32px_1fr_20px] gap-2">
              <H3 className="text-xl font-bold">Rosenmontagszug</H3>
              <P className="text-slate-700">
                Genießen Sie den traditionellen Höhepunkt des Karnevals mit
                bunten Umzügen.
              </P>
              <div className="flex items-center justify-between">
                <div className="flex space-x-2 items-center">
                  <CalendarDaysIcon className="h-5 w-5 stroke-emerald-600" />
                  <span className="text-sm">20. Februar 2023</span>
                </div>
                <LinkWithIcon href="#" Icon={ChevronRightCircle} />
              </div>
            </CardContent>
          </Card>
          <Card className="p-4 hover:shadow-lg duration-500 hover:shadow-emerald-600/60">
            <CardContent className="space-y-2 h-full grid grid-rows-[32px_1fr_20px] gap-2">
              <H3 className="text-xl font-bold">Kostümball</H3>
              <P className="text-slate-700">
                Feiern Sie mit uns den Höhepunkt der Karnevalssaison in
                aufwendigen Kostümen.
              </P>
              <div className="flex items-center justify-between">
                <div className="flex space-x-2 items-center">
                  <CalendarDaysIcon className="h-5 w-5 stroke-emerald-600" />
                  <span className="text-sm">25. Februar 2023</span>
                </div>
                <LinkWithIcon href="#" Icon={ChevronRightCircle} />
              </div>
            </CardContent>
          </Card>
          <Card className="p-4 hover:shadow-lg duration-500 hover:shadow-emerald-600/60">
            <CardContent className="space-y-2 h-full grid grid-rows-[32px_1fr_20px] gap-2">
              <H3 className="text-xl font-bold">Kinderkarneval</H3>
              <P className="text-slate-700">
                Lassen Sie Ihre Kinder in die bunte Welt des Karnevals
                eintauchen.
              </P>
              <div className="flex items-center justify-between">
                <div className="flex space-x-2 items-center">
                  <CalendarDaysIcon className="h-5 w-5 stroke-emerald-600" />
                  <span className="text-sm">11. März 2023</span>
                </div>
                <LinkWithIcon href="#" Icon={ChevronRightCircle} />
              </div>
            </CardContent>
          </Card>
          <Card className="p-4 hover:shadow-lg duration-500 hover:shadow-emerald-600/60">
            <CardContent className="space-y-2  h-full grid grid-rows-[32px_1fr_20px] gap-2">
              <H3 className="text-xl font-bold">Rosenmontagszug</H3>
              <P className="text-slate-700">
                Genießen Sie den traditionellen Höhepunkt des Karnevals mit
                bunten Umzügen.
              </P>
              <div className="flex items-center justify-between">
                <div className="flex space-x-2 items-center">
                  <CalendarDaysIcon className="h-5 w-5 stroke-emerald-600" />
                  <span className="text-sm">20. Februar 2023</span>
                </div>
                <LinkWithIcon href="#" Icon={ChevronRightCircle} />
              </div>
            </CardContent>
          </Card>
          <Card className="p-4 hover:shadow-lg duration-500 hover:shadow-emerald-600/60">
            <CardContent className="space-y-2 h-full grid grid-rows-[32px_1fr_20px] gap-2">
              <H3 className="text-xl font-bold">Kostümball</H3>
              <P className="text-slate-700">
                Feiern Sie mit uns den Höhepunkt der Karnevalssaison in
                aufwendigen Kostümen.
              </P>
              <div className="flex items-center justify-between">
                <div className="flex space-x-2 items-center">
                  <CalendarDaysIcon className="h-5 w-5 stroke-emerald-600" />
                  <span className="text-sm">25. Februar 2023</span>
                </div>
                <LinkWithIcon href="#" Icon={ChevronRightCircle} />
              </div>
            </CardContent>
          </Card>
          <Card className="p-4 hover:shadow-lg duration-500 hover:shadow-emerald-600/60">
            <CardContent className="space-y-2 h-full grid grid-rows-[32px_1fr_20px] gap-2">
              <H3 className="text-xl font-bold">Kinderkarneval</H3>
              <P className="text-slate-700">
                Lassen Sie Ihre Kinder in die bunte Welt des Karnevals
                eintauchen.
              </P>
              <div className="flex items-center justify-between">
                <div className="flex space-x-2 items-center">
                  <CalendarDaysIcon className="h-5 w-5 stroke-emerald-600" />
                  <span className="text-sm">11. März 2023</span>
                </div>
                <LinkWithIcon href="#" Icon={ChevronRightCircle} />
              </div>
            </CardContent>
          </Card>
          <Card className="p-4 hover:shadow-lg duration-500 hover:shadow-emerald-600/60">
            <CardContent className="space-y-2  h-full grid grid-rows-[32px_1fr_20px] gap-2">
              <H3 className="text-xl font-bold">Rosenmontagszug</H3>
              <P className="text-slate-700">
                Genießen Sie den traditionellen Höhepunkt des Karnevals mit
                bunten Umzügen.
              </P>
              <div className="flex items-center justify-between">
                <div className="flex space-x-2 items-center">
                  <CalendarDaysIcon className="h-5 w-5 stroke-emerald-600" />
                  <span className="text-sm">20. Februar 2023</span>
                </div>
                <LinkWithIcon href="#" Icon={ChevronRightCircle} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>    
    </main>
  );
};

export default VeranstaltungenPage;
