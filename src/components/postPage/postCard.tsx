import type { SelectPostWithAccountAndCategory } from "@/server/db/schema";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { ChevronRightCircle } from "lucide-react";
import { env } from "process";
import React from "react";
import LinkWithUnderline from "../Links/LinkWithUnderline";
import H3 from "../typography/h3";
import Muted from "../typography/muted";
import P from "../typography/p";
import Small from "../typography/small";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Badge } from "../ui/badge";

const PostCard = ({ post }: { post: SelectPostWithAccountAndCategory }) => {
  return (
    <article key={post.id}>
      <Card className="container space-y-4 p-0 duration-500 hover:shadow-md hover:shadow-primary/60 sm:space-y-0 ">
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
                <Muted>{post.createdAt?.toLocaleDateString("de-De")}</Muted>
                <P className="line-clamp-2 [&:not(:first-child)]:mt-1">
                  {post.teaser}
                </P>
              </div>
              <div className=" flex gap-2  self-start">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Avatar>
                        <AvatarImage asChild />
                        <Image
                          src={post.author.imageUrl}
                          alt={post.author.name}
                          fill
                          sizes="128px"
                        />
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
                    <Badge variant={"secondary"} key={relation.categorieId}>
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
                <ChevronRightCircle size={16} className="stroke-primary" />
              </LinkWithUnderline>
            </div>
          </div>
        </CardContent>
      </Card>
    </article>
  );
};

export default PostCard;
