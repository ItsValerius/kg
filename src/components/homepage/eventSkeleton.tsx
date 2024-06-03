import { CalendarDaysIcon, ChevronRightCircle } from "lucide-react";
import LinkWithUnderline from "../Links/LinkWithUnderline";
import { H2 } from "../typography/h2";
import P from "../typography/p";
import Small from "../typography/small";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const EventSkeleton = () => {
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
          {new Array(3).fill(0).map((_, i) => {
            return (
              <Card
                className="h-48 p-4 duration-500 hover:shadow-md hover:shadow-primary/60"
                key={i}
              >
                <CardContent className="grid h-full grid-rows-[32px_1fr_20px] gap-2 ">
                  <div>
                    <Skeleton className="h-8 w-1/3 animate-pulse md:w-32" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-5/6 animate-pulse md:w-60" />
                    <Skeleton className="h-6 w-3/4 animate-pulse md:w-56" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CalendarDaysIcon className="h-5 w-5 stroke-primary" />
                      <span className="text-sm">
                        <Skeleton className="h-4 w-32  animate-pulse md:w-24" />
                      </span>
                    </div>
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
          <ChevronRightCircle size={16} className="stroke-primary" />
        </LinkWithUnderline>
      </div>
    </section>
  );
};

export default EventSkeleton;
