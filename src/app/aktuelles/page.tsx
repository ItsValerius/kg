import PostCard from "@/components/postPage/postCard";
import { H1 } from "@/components/typography/h1";
import P from "@/components/typography/p";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/server/db";
import { getActivePosts } from "@/server/db/lib";

import { SearchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const AktuellesPage = async () => {
  const posts = await getActivePosts();
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
              return <PostCard post={post} key={post.id} />;
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
