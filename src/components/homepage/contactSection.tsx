import { H2 } from "@/components/typography/h2";
import P from "@/components/typography/p";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const ContactSection = () => {
  return (
    <section className="px-4 py-12 md:px-6 ">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="space-y-2 text-center">
          <H2 className="text-3xl font-bold">Kontaktieren Sie uns</H2>
          <P className="text-foreground">
            Haben Sie Fragen oder möchten Sie mehr über unseren Verein erfahren?
            Schreiben Sie uns!
          </P>
        </div>
        <form className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Ihr Name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-Mail</Label>
              <Input
                id="email"
                placeholder="Ihre E-Mail-Adresse"
                required
                type="email"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Nachricht</Label>
            <Textarea id="message" placeholder="Ihre Nachricht" required />
          </div>
          <Button className="w-full " type="submit">
            Absenden
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
