import { ChevronRightCircle } from "lucide-react";
import LinkWithUnderline from "../Links/LinkWithUnderline";
import { H2 } from "../typography/h2";
import H3 from "../typography/h3";
import Muted from "../typography/muted";
import P from "../typography/p";
import Small from "../typography/small";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { Badge } from "../ui/badge";

const NewsSkeleton = () => {
  return (
    <section className="px-4 py-12 md:px-6">
      <div className="mx-auto flex max-w-5xl flex-col space-y-8">
        <div className="space-y-2 text-center">
          <H2>Aktuelles aus unserem Verein</H2>
          <P>Erfahren Sie mehr über aktuelles in unserem Verein.</P>
        </div>
        <div className="flex flex-col gap-2 p-4">
          {new Array(3).fill(0).map((_, i) => {
            return (
              <article key={i}>
                <Card className="h-46 container space-y-4 p-0 duration-500 hover:shadow-md hover:shadow-primary/60 sm:space-y-0">
                  <CardContent className="grid grid-rows-2 items-start gap-4 p-0 sm:grid-cols-[250px_1fr] sm:grid-rows-1 ">
                    <Skeleton className="row-span-2 aspect-[3/2] h-[320px] w-full animate-pulse overflow-hidden rounded-t-md sm:h-full  sm:max-w-[250px] sm:rounded-none sm:rounded-l-md" />
                    <div className="p-4">
                      <div className="flex justify-between gap-2 space-x-2">
                        <div className="space-y-2">
                          <H3>
                            <Skeleton className="h-8 w-32 animate-pulse" />
                          </H3>
                          <Muted>
                            <Skeleton className="h-5 w-14 animate-pulse" />
                          </Muted>
                          <P className="line-clamp-2 [&:not(:first-child)]:mt-1">
                            <Skeleton className="h-6 w-96 animate-pulse" />
                            <Skeleton className="h-6 w-72 animate-pulse" />
                          </P>
                        </div>
                        <div className=" flex gap-2  self-start">
                          <Skeleton className="h-10 w-10 animate-pulse rounded-full" />
                        </div>
                      </div>
                      <div className="flex w-full flex-col ">
                        <div className="flex flex-wrap gap-1 px-1 sm:p-2 sm:px-0">
                          {new Array(2).fill(0).map((_,i) => {
                            return (
                              <Badge
                                variant={"secondary"}
                                key={i}
                              >
                               <Skeleton className="animate-pulse h-4 w-8" />
                              </Badge>
                            );
                          })}
                        </div>
                        <LinkWithUnderline
                          href={`#`}
                          className="self-end"
                          spanClassName=" flex items-center gap-1 pb-1"
                        >
                          <Small>Mehr Anzeigen</Small>
                          <ChevronRightCircle
                            size={16}
                            className="stroke-primary"
                          />
                        </LinkWithUnderline>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </article>
            );
          })}
        </div>
        <LinkWithUnderline
          href="/aktuelles"
          className="self-end"
          spanClassName=" flex items-center gap-1 pb-1"
        >
          <Small>Alle News</Small>
          <ChevronRightCircle size={16} className="stroke-primary" />
        </LinkWithUnderline>
      </div>
    </section>
  );
};

export default NewsSkeleton;
