import ContactSection from "@/components/homepage/contactSection";
import EventsSection from "@/components/homepage/eventsSection";
import HeroSection from "@/components/homepage/heroSection";
import UeberunsSection from "@/components/homepage/ueberunsSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <EventsSection />
      <UeberunsSection />
      <ContactSection />
    </main>
  );
}
