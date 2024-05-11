import React from "react";
import { H2 } from "@/components/typography/h2";
import P from "@/components/typography/p";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ContactSection = () => {
  return (
    <section className="py-12 px-4 md:px-6 ">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <H2 className="text-3xl font-bold">Kontaktieren Sie uns</H2>
          <P className="text-slate-700">
            Haben Sie Fragen oder möchten Sie mehr über unseren Verein erfahren?
            Schreiben Sie uns!
          </P>
        </div>
        <form className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Ihr Name"
                required
                className="focus-visible:ring-emerald-500/50 "
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-Mail</Label>
              <Input
                id="email"
                placeholder="Ihre E-Mail-Adresse"
                required
                type="email"
                className="focus-visible:ring-emerald-500/50 "
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Nachricht</Label>
            <Textarea
              id="message"
              placeholder="Ihre Nachricht"
              required
              className="focus-visible:ring-emerald-500/50 "
            />
          </div>
          <Button
            className="w-full bg-emerald-500 hover:bg-emerald-700"
            type="submit"
          >
            Absenden
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
