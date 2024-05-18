import { getActivePosts } from "@/server/db/lib";
import { ChevronRightCircle } from "lucide-react";
import LinkWithUnderline from "../Links/LinkWithUnderline";
import PostCard from "../postPage/postCard";
import { H2 } from "../typography/h2";
import P from "../typography/p";
import Small from "../typography/small";

const NewsSection = async () => {
  const posts = await getActivePosts(3);
  return (
    <section className="px-4 py-12 md:px-6">
      <div className="mx-auto flex max-w-5xl flex-col space-y-8">
        <div className="space-y-2 text-center">
          <H2>Aktuelles aus unserem Verein</H2>
          <P>Erfahren Sie mehr über aktuelles in unserem Verein.</P>
        </div>
        <div className="flex flex-col gap-2 p-4">
          {posts.map((post) => {
            return <PostCard post={post} key={post.id} />;
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
