import ContactSection from "@/components/homepage/contactSection";
import EventSkeleton from "@/components/homepage/eventSkeleton";
import EventsSection from "@/components/homepage/eventsSection";
import HeroSection from "@/components/homepage/heroSection";
import NewsSection from "@/components/homepage/newsSection";
import NewsSkeleton from "@/components/homepage/newsSkeleton";
import UeberunsSection from "@/components/homepage/ueberunsSection";
import { Suspense } from "react";

export const maxDuration = 30;

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Suspense fallback={<EventSkeleton />}>
        <EventsSection />
      </Suspense>
      <UeberunsSection />
      <Suspense fallback={<NewsSkeleton />}>
        <NewsSection />
      </Suspense>
      <ContactSection />
    </main>
  );
}
