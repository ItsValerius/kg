import { H2 } from "@/components/typography/h2";
import P from "@/components/typography/p";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <div className="flex h-full w-full flex-col items-center justify-center">
        <H2>Hoppla!</H2>
        <P>Da ist wohl was schief gelaufen.</P>
        <Button asChild variant="link">
          <Link href="/">Zurück zur Startseite</Link>
        </Button>
      </div>
    </main>
  );
}
