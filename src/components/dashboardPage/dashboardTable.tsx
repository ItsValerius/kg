import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { env } from "@/env";
import { type SelectEvent, type SelectPost } from "@/server/db/schema";
import parse from "html-react-parser";
import StatusBadge from "./statusBadge";

export default function DashboardTable({
  events,
  posts,
}: {
  events?: SelectEvent[];
  posts?: SelectPost[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{events ? "Veranstaltungen" : "Aktuelles"}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table className="">
          <TableHeader>
            <TableRow>
              {events ? null : (
                <TableHead className="hidden sm:table-cell">Bild</TableHead>
              )}
              <TableHead>Name</TableHead>
              <TableHead>Beschreibung</TableHead>
              <TableHead>Status</TableHead>
              {events ? (
                <TableHead className="hidden md:table-cell">Preis</TableHead>
              ) : null}

              <TableHead className="hidden md:table-cell">Erstellt</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events?.map((event) => {
              return (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.name}</TableCell>
                  <TableCell className="max-w-32">
                    <div className=" line-clamp-2 w-full text-balance font-medium">
                      {parse(event.description)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={event.status} />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {new Intl.NumberFormat("de-DE", {
                      style: "currency",
                      currency: "EUR",
                      notation: "standard",
                    }).format(event.price / 100)}
                  </TableCell>

                  <TableCell className="hidden md:table-cell">
                    {new Intl.DateTimeFormat("de-DE", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                    }).format(event.createdAt)}
                  </TableCell>
                </TableRow>
              );
            })}
            {posts?.map((post) => {
              return (
                <TableRow key={post.id}>
                  <TableCell className="hidden sm:table-cell">
                    <Image
                      alt="Product image"
                      className="aspect-square rounded-md object-cover"
                      height="64"
                      src={`${env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/article_images/${post.slug}`}
                      width="64"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell className="max-w-32">
                    <div className=" line-clamp-2 w-full text-balance font-medium">
                      {parse(post.content)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={post.status} />
                  </TableCell>

                  <TableCell className="hidden md:table-cell">
                    {new Intl.DateTimeFormat("de-DE", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                    }).format(post.createdAt)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>32</strong> products
        </div>
      </CardFooter>
    </Card>
  );
}
