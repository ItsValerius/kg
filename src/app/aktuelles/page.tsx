import LinkWithUnderline from "@/components/Links/LinkWithUnderline";
import { H1 } from "@/components/typography/h1";
import H3 from "@/components/typography/h3";
import Muted from "@/components/typography/muted";
import P from "@/components/typography/p";
import Small from "@/components/typography/small";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { db } from "@/server/db";
import { postsTable } from "@/server/db/schema";
import { desc } from "drizzle-orm";
import { ChevronRightCircle, SearchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const AktuellesPage = async () => {
  const posts = await db.query.postsTable.findMany({
    with: { author: true, categoriesToPosts: { with: { category: true } } },
    orderBy: desc(postsTable.createdAt),
  });
  const categories = await db.query.categoriesTable.findMany({
    with: { categoriesToPosts: { with: { post: true } } },
  });

  return (
    <main>
      <div className="flex flex-col gap-12 py-12 md:py-16 lg:py-24">
        <section className=" flex flex-col items-center gap-6 text-center">
          <div className="flex flex-col items-center gap-3">
            <Link className="flex items-center space-x-2" href="/">
              <Image
                src="https://knallkoepp-golkrath.de/s/misc/logo.png"
                width={64}
                height={64}
                alt="logo"
              />
            </Link>
            <H1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              KG Knallköpp Golkrath News
            </H1>
          </div>
          <P className="max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
            Stay up to date with the latest news and events from our local
            community club.
          </P>
        </section>
        <div className="container grid grid-cols-1 gap-8 lg:grid-cols-[1fr_300px]">
          <div className="grid gap-8">
            {posts.map((post) => {
              return (
                <article key={post.id}>
                  <Card className="container space-y-4 p-0 duration-500 hover:shadow-lg hover:shadow-emerald-600/60 sm:space-y-0 ">
                    <CardContent className="grid grid-rows-2 items-start gap-4 p-0 sm:grid-cols-[250px_1fr] sm:grid-rows-1 ">
                      <Image
                        alt="Article thumbnail"
                        className="row-span-2 aspect-[3/2] max-h-[320px] w-full overflow-hidden rounded-t-md  sm:h-full sm:max-w-[250px] sm:rounded-md"
                        height="100"
                        src="/images/yt-banner.jpg"
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
                                      src="https://github.com/shadcn.png"
                                      alt={post.author?.name}
                                    />

                                    <AvatarFallback>
                                      {post.author?.name}
                                    </AvatarFallback>
                                  </Avatar>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <Small className="">
                                    {post.author?.name}
                                  </Small>
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
          <div className="space-y-8">
            <div className="rounded-lg border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
              <h3 className="text-lg font-medium">Categories</h3>
              <div className="mt-4 grid gap-2">
                {categories.map((categorie) => {
                  return (
                    <Link
                      className="flex items-center justify-between text-sm font-medium hover:underline"
                      href="#"
                      key={categorie.id}
                    >
                      <span>{categorie.name}</span>
                      <Badge
                        className="dark:bg-gray-800 dark:text-gray-50"
                        variant="secondary"
                      >
                        {categorie.categoriesToPosts.length}
                      </Badge>
                    </Link>
                  );
                })}
                <Link
                  className="flex items-center justify-between text-sm font-medium hover:underline"
                  href="#"
                >
                  <span>Events</span>
                  <Badge
                    className="dark:bg-gray-800 dark:text-gray-50"
                    variant="secondary"
                  >
                    12
                  </Badge>
                </Link>
                <Link
                  className="flex items-center justify-between text-sm font-medium hover:underline"
                  href="#"
                >
                  <span>Announcements</span>
                  <Badge
                    className="dark:bg-gray-800 dark:text-gray-50"
                    variant="secondary"
                  >
                    8
                  </Badge>
                </Link>
                <Link
                  className="flex items-center justify-between text-sm font-medium hover:underline"
                  href="#"
                >
                  <span>Volunteer</span>
                  <Badge
                    className="dark:bg-gray-800 dark:text-gray-50"
                    variant="secondary"
                  >
                    6
                  </Badge>
                </Link>
                <Link
                  className="flex items-center justify-between text-sm font-medium hover:underline"
                  href="#"
                >
                  <span>Classes</span>
                  <Badge
                    className="dark:bg-gray-800 dark:text-gray-50"
                    variant="secondary"
                  >
                    9
                  </Badge>
                </Link>
              </div>
            </div>
            <div className="rounded-lg border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
              <h3 className="text-lg font-medium">Search</h3>
              <form className="mt-4 flex">
                <Input
                  className="flex-1 focus-visible:ring-emerald-500/50"
                  placeholder="Search news..."
                  type="text"
                />
                <Button className="ml-2" type="submit" variant="outline">
                  <SearchIcon className="h-5 w-5" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AktuellesPage;
