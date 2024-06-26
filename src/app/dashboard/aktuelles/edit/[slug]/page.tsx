import { DashboardFormNews } from "@/components/dashboardPage/dashboardFormNews";
import { db } from "@/server/db";
import { postsTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

const EditAktuellesPage = async ({ params }: { params: { slug: string } }) => {
  const post = await db.query.postsTable.findFirst({
    where: eq(postsTable.slug, params.slug),
  });

  if (!post) return notFound();

  return (
    <main>
      <DashboardFormNews post={post} userId={post.userId} />
    </main>
  );
};

export default EditAktuellesPage;
