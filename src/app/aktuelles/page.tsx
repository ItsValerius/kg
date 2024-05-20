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
import { H2 } from "@/components/typography/h2";

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
      <section className="px-4 py-12 md:px-6">
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="space-y-2 text-center">
            <H2>Aktuelles</H2>
            <P>Erfahren Sie aktuelles aus unserem Verein.</P>
          </div>
          <div className="container grid grid-cols-1 gap-8 lg:grid-cols-[1fr_300px]">
            <div className="grid gap-8">
              {posts.map((post) => {
                return <PostCard post={post} key={post.id} />;
              })}
            </div>
            <div className="grid space-y-8">
              <Suspense fallback={<FallbackCard />}>
                <CategoriesCard categories={categories} />
              </Suspense>
              <SearchCard />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AktuellesPage;
