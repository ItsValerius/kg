import { CalendarDaysIcon, ChevronRightCircle } from "lucide-react";
import React from "react";
import LinkWithIcon from "../Links/LinkWithIcon";
import H3 from "../typography/h3";
import P from "../typography/p";
import { Card, CardContent } from "../ui/card";
import { SelectEvent } from "@/server/db/schema";

const EventCard = ({ event }: { event: SelectEvent }) => {
  return (
    <Card
      className="p-4 duration-500 hover:shadow-lg hover:shadow-emerald-600/60"
      key={event.id}
    >
      <CardContent className="grid h-full grid-rows-[32px_1fr_20px] gap-2 space-y-2">
        <H3 className="text-xl font-bold">{event.name}</H3>
        <P className="text-slate-700">{event.teaser}</P>
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
};

export default EventCard;