import { H1 } from "@/components/typography/h1";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { db } from "@/server/db";
import { postsTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { serialize } from "next-mdx-remote/serialize";
import { notFound } from "next/navigation";


export async function generateStaticParams() {
  const posts = await db.query.postsTable.findMany();
 
  return posts.map((post) => ({
    slug: post.slug,
  }))
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
  const mdxSource = await serialize(post.content);

  return (
    <Card className="">
      <CardHeader>
        <H1>{post.title}</H1>
      </CardHeader>
      <CardContent dangerouslySetInnerHTML={{__html:post.content}} className="prose">

      </CardContent>
      <CardFooter>
        {"<"} Back
      </CardFooter>
    </Card>
  );
};

export default AktuellesDetailsPage;
