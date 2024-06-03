"use client";
import type { SelectCategoryWithPosts } from "@/server/db/schema";
import Link from "next/link";
import H4 from "../typography/h4";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader } from "../ui/card";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const CategoriesCard = ({
  categories,
}: {
  categories?: SelectCategoryWithPosts[];
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  return (
    <Card>
      <CardHeader>
        <H4>Kategorien</H4>
      </CardHeader>
      <CardContent>
        <div className="mt-4 grid gap-2 ">
          {categories?.map((category) => {
            if (category.categoriesToPosts.length === 0) return;
            return (
              <Link
                className="flex items-center justify-between text-sm font-medium hover:underline"
                href={
                  pathname + "?" + createQueryString("category", category.name)
                }
                key={category.id}
              >
                <span>{category.name}</span>
                <Badge
                  className="dark:bg-gray-800 dark:text-gray-50"
                  variant="secondary"
                >
                  {category.categoriesToPosts.length}
                </Badge>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoriesCard;
