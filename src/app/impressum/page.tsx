import LinkWithUnderline from "@/components/Links/LinkWithUnderline";
import H4 from "@/components/typography/h4";
import P from "@/components/typography/p";
import Small from "@/components/typography/small";

const ImpressumPage = () => {
  return (
    <main className="max-w-3xl mx-auto p-4">
      <P>Für das vorliegende Informationsangebot:</P>
      <LinkWithUnderline
        href="https://www.knallkoepp-golkrath.de"
        className="font-semibold"
      >
        https://www.knallkoepp-golkrath.de
      </LinkWithUnderline>
      <P className="[&:not(:first-child)]:mt-1">
        zeichnen folgende Einrichtung bzw. Personen verantwortlich im Sinne der
        einschlägigen gesetzlichen Bestimmungen:
      </P>
      <H4 className="mt-2">KG Knallköpp Golkrath e.V. von 1929</H4>
      <Small>Mitglied im Bund Deutscher Karneval</Small> <br />
      <Small>Mitglied im VKAG und VKEL </Small>
      <br />
      <H4 className="mt-2">Geschäftsstelle:</H4>
      <P className="[&:not(:first-child)]:mt-1">
        Hochstraße 3 41812 Erkelenz 02431/73440
      </P>
      <P className="[&:not(:first-child)]:mt-1">1. Vorsitzender: Achim Kück</P>
      <P className="[&:not(:first-child)]:mt-1">
        1. Geschäftsführerin: Ulrike Rohm
      </P>
      <P className=" [&:not(:first-child)]:mt-1">
        1. Schatzmeister: Fritz Sander
      </P>
      <H4 className="mt-2">Gemeinnützigkeit</H4>
      Wir sind wegen der Förderung des traditionellen Brauchtums nach dem
      Freistellungsbescheid des Finanzamtes Erkelenz (StNr. 208/5793/0945) vom
      30.05.2017 nach § 5 Abs. 1 Nr. 9 des Körperschaftsteuergesetzes von der
      Körperschaftsteuer befreit.
      <P className="text-semibold">
        Wir sind berechtigt für Spenden Zuwendungsbestätigungen nach amtlich
        vorgeschriebenem Vordruck auszustellen.
      </P>
      <H4 className="mt-2">Inhaltlich und technisch verantwortlich:</H4>
      Achim Kück bzw. die auf den einzelnen Seiten genannten Autoren
      <H4 className="mt-2">Haftungshinweis:</H4>
      Trotz sorgfältiger inhaltlicher Kontrolle können wir keine Haftung für die
      Inhalte externer Links übernehmen. Für den Inhalt der verlinkten Seiten
      sind ausschließlich deren Betreiber verantwortlich. Weitere
      Haftungshinweise und sonstige Angaben zu den Nutzungsbedingungen dieses
      Internetangebots erhalten Sie in einem allgemein formulierten disclaimer.
    </main>
  );
};

export default ImpressumPage;
