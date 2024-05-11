import Header from "@/components/homepage/header";
import HeroSection from "@/components/homepage/heroSection";
import EventsSection from "@/components/homepage/eventsSection";
import UeberunsSection from "@/components/homepage/ueberunsSection";
import ContactSection from "@/components/homepage/contactSection";

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
