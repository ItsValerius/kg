import ContactSection from "@/components/homepage/contactSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt",
};

const KontaktPage = () => {
  return (
    <main>
      <ContactSection />
    </main>
  );
};

export default KontaktPage;
