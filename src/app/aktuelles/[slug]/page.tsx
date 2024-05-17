import LinkWithUnderline from "@/components/Links/LinkWithUnderline";
import { H1 } from "@/components/typography/h1";
import Small from "@/components/typography/small";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { env } from "@/env";
import { db } from "@/server/db";
import { postsTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { ChevronLeftCircle } from "lucide-react";
import { notFound } from "next/navigation";
import Image from "next/image";

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
    <main>
      <div className=" p-4 w-fit">
        <LinkWithUnderline
          href="/aktuelles"
          spanClassName=" flex items-center gap-1 pb-1 w-fit "
        >
          <ChevronLeftCircle size={16} className="stroke-emerald-600" />
          <Small className="sm:text-lg">Alle News</Small>
        </LinkWithUnderline>
      </div>
      <section className="mx-auto max-w-5xl p-4">
        <Card>
          <CardHeader>
            <H1>{post.title}</H1>
          </CardHeader>
          <CardContent className=" w-full relative aspect-[3/2]  ">
            <Image src={`${env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/article_images/${post.slug}`} fill alt="Artikel Bild" className="p-4"
             sizes="(max-width: 1024px) 100vw, (max-width: 1920px) 50vw, 33vw"
            />
          </CardContent>
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
