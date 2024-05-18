import React from "react";
import { H2 } from "../typography/h2";
import P from "../typography/p";
import { db } from "@/server/db";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { ChevronRightCircle } from "lucide-react";
import { env } from "@/env";
import LinkWithUnderline from "../Links/LinkWithUnderline";
import H3 from "../typography/h3";
import Muted from "../typography/muted";
import Small from "../typography/small";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import Image from "next/image";

const NewsSection = async () => {
  const posts = await db.query.postsTable.findMany({
    limit: 3,
    with: { author: true, categoriesToPosts: { with: { category: true } } },
  });
  return (
    <section className="px-4 py-12 md:px-6">
      <div className="mx-auto flex max-w-5xl flex-col space-y-8">
        <div className="space-y-2 text-center">
          <H2>Aktuelles aus unserem Verein</H2>
          <P>Erfahren Sie mehr über aktuelles in unserem Verein.</P>
        </div>
        <div className="flex gap-2 flex-col p-4">
          {posts.map((post) => {
            return (
              <article key={post.id}>
                <Card className="container space-y-4 p-0 duration-500 hover:shadow-lg hover:shadow-emerald-600/60 sm:space-y-0 ">
                  <CardContent className="grid grid-rows-2 items-start gap-4 p-0 sm:grid-cols-[250px_1fr] sm:grid-rows-1 ">
                    <Image
                      alt="Article thumbnail"
                      className="row-span-2 aspect-[3/2] max-h-[320px] w-full overflow-hidden rounded-t-md sm:h-full sm:max-w-[250px]  sm:rounded-none sm:rounded-l-md"
                      height="100"
                      src={`${env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/article_images/${post.slug}`}
                      width="150"
                    />
                    <div className="p-4">
                      <div className="flex justify-between gap-2 space-x-2">
                        <div>
                          <H3>{post.title}</H3>
                          <Muted>
                            {post.createdAt.toLocaleDateString("de-De")}
                          </Muted>
                          <P className="line-clamp-2 [&:not(:first-child)]:mt-1">
                            {post.teaser}
                          </P>
                        </div>
                        <div className=" flex gap-2  self-start">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Avatar>
                                  <AvatarImage
                                    asChild
                                    src={post.author.imageUrl}
                                    alt={post.author.name}
                                  />
                                  <Image
                                    src={post.author.imageUrl}
                                    alt={post.author.name}
                                    fill
                                  />
                                  <AvatarFallback>
                                    <Skeleton className="h-10 w-10 animate-pulse rounded-full" />
                                  </AvatarFallback>
                                </Avatar>
                              </TooltipTrigger>
                              <TooltipContent>
                                <Small className="">{post.author.name}</Small>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                      <div className="flex w-full flex-col ">
                        <div className="flex flex-wrap gap-1 px-1 sm:p-2 sm:px-0">
                          {post.categoriesToPosts.map((relation) => {
                            return (
                              <Badge
                                variant={"secondary"}
                                key={relation.categorieId}
                              >
                                {relation.category.name}
                              </Badge>
                            );
                          })}
                        </div>
                        <LinkWithUnderline
                          href={`/aktuelles/${post.slug}`}
                          className="self-end"
                          spanClassName=" flex items-center gap-1 pb-1"
                        >
                          <Small>Mehr Anzeigen</Small>
                          <ChevronRightCircle
                            size={16}
                            className="stroke-emerald-600"
                          />
                        </LinkWithUnderline>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </article>
            );
          })}
        </div>
        <LinkWithUnderline
          href="/aktuelles"
          className="self-end"
          spanClassName=" flex items-center gap-1 pb-1"
        >
          <Small>Alle News</Small>
          <ChevronRightCircle size={16} className="stroke-emerald-600" />
        </LinkWithUnderline>
      </div>
    </section>
  );
};

export default NewsSection;
