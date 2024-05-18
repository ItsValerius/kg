import ContactSection from "@/components/homepage/contactSection";
import EventsSection from "@/components/homepage/eventsSection";
import HeroSection from "@/components/homepage/heroSection";
import NewsSection from "@/components/homepage/newsSection";
import UeberunsSection from "@/components/homepage/ueberunsSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <EventsSection />
      <UeberunsSection />
      <NewsSection />
      <ContactSection />
    </main>
  );
}
