import CategoriesCard from "@/components/postPage/categoriesCard";
import SearchCard from "@/components/postPage/searchCard";
import PostCard from "@/components/postPage/postCard";
import { H1 } from "@/components/typography/h1";
import P from "@/components/typography/p";
import { db } from "@/server/db";
import { getActivePosts } from "@/server/db/lib";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import FallbackCard from "@/components/postPage/fallbackCard";

export const metadata: Metadata = {
  title: "Aktuelles",
};

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
          <div className="grid space-y-8">
            <CategoriesCard categories={categories} />
            <Suspense fallback={<FallbackCard />}>
              <SearchCard />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AktuellesPage;
