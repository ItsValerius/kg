import LinkWithUnderline from "@/components/Links/LinkWithUnderline";
import { H1 } from "@/components/typography/h1";
import Small from "@/components/typography/small";
import {
  Card,
  CardContent,
  CardHeader
} from "@/components/ui/card";
import { db } from "@/server/db";
import { postsTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { ChevronLeftCircle } from "lucide-react";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const posts = await db.query.postsTable.findMany();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

const AktuellesDetailsPage = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const post = await db.query.postsTable.findFirst({
    where: eq(postsTable.slug, params.slug),
  });

  if (!post) return notFound();

  return (
    <main >
      <div className=" p-4">
        <LinkWithUnderline
          href="/aktuelles"
          spanClassName=" flex items-center gap-1 pb-1 w-fit"
        >
          <ChevronLeftCircle size={16} className="stroke-emerald-600" />
          <Small>Alle News</Small>
        </LinkWithUnderline>
      </div>
      <section className="max-w-5xl p-4 mx-auto">
        <Card >
          <CardHeader>
            <H1>{post.title}</H1>
          </CardHeader>
          <CardContent
            dangerouslySetInnerHTML={{ __html: post.content }}
            className="prose"
          ></CardContent>
        </Card>
      </section>
    </main>
  );
};

export default AktuellesDetailsPage;
