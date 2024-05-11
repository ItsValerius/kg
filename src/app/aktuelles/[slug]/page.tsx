import { db } from "@/server/db";
import React from "react";
import { eq } from "drizzle-orm";
import { postsTable } from "@/server/db/schema";
import { notFound } from "next/navigation";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { H1 } from "@/components/typography/h1";
import { MDXRemote } from "next-mdx-remote/rsc";
import { serialize } from "next-mdx-remote/serialize";


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
