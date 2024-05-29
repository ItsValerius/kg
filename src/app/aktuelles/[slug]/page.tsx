import LinkWithUnderline from "@/components/Links/LinkWithUnderline";
import { H1 } from "@/components/typography/h1";
import Small from "@/components/typography/small";
import { Card, CardContent } from "@/components/ui/card";
import { env } from "@/env";
import { db } from "@/server/db";
import { postsTable } from "@/server/db/schema";
import { and, eq } from "drizzle-orm";
import parse from "html-react-parser";
import { ChevronLeftCircle } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
export async function generateStaticParams() {
  const posts = await db.query.postsTable.findMany();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
type Props = {
  params: { slug: string };
};
export async function generateMetadata({ params }: Props) {
  const post = await db.query.postsTable.findFirst({
    where: eq(postsTable.slug, params.slug),
  });
  return {
    title: post?.title,
  };
}

const AktuellesDetailsPage = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const post = await db.query.postsTable.findFirst({
    where: and(
      eq(postsTable.slug, params.slug),
      eq(postsTable.status, "active"),
    ),
  });

  if (!post) return notFound();

  return (
    <main>
      <div className=" w-fit p-4">
        <LinkWithUnderline
          href="/aktuelles"
          spanClassName=" flex items-center gap-1 pb-1 w-fit "
        >
          <ChevronLeftCircle size={16} className="stroke-primary" />
          <Small className="sm:text-lg">Alle News</Small>
        </LinkWithUnderline>
      </div>
      <section className="mx-auto max-w-3xl space-y-4 p-4 pt-0">
        <div className="w-full text-center">
          <H1>{post.title}</H1>
        </div>
        <Card className="space-y-2">
          <CardContent className=" relative aspect-[3/2] w-full p-0 ">
            <Image
              src={`${env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/article_images/${post.slug}`}
              fill
              alt="Artikel Bild"
              className="overflow-hidden rounded-t-md"
              sizes="(max-width: 1024px) 100vw, (max-width: 1920px) 50vw, 33vw"
            />
          </CardContent>
          <CardContent className="prose">{parse(post.content)}</CardContent>
        </Card>
      </section>
    </main>
  );
};

export default AktuellesDetailsPage;
