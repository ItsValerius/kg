import { MoreHorizontal } from "lucide-react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type SelectEvent, type SelectPost } from "@/server/db/schema";
import { env } from "@/env";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import DashboardUpdateStatus from "./dashboardUpdateStatus";

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
        <CardTitle>{events ? "Events" : "Posts"}</CardTitle>
        <CardDescription>
          {events ? "Event Description" : "Posts Description"}
        </CardDescription>
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
                    <div
                      className=" line-clamp-2 w-full text-balance font-medium"
                      dangerouslySetInnerHTML={{ __html: event.description }}
                    ></div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {event.status}{" "}
                    </Badge>
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
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                          <Link
                            href={
                              "/dashboard" +
                              (events ? "/veranstaltungen" : "/aktuelles") +
                              "/edit" +
                              "/" +
                              event.slug
                            }
                          >
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <AlertDialog>
                            <AlertDialogTrigger>Delete</AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will
                                  permanently delete your account and remove
                                  your data from our servers.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction>Continue</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <DashboardUpdateStatus data={event} />
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
                    <div
                      className=" line-clamp-2 w-full text-balance font-medium"
                      dangerouslySetInnerHTML={{ __html: post.content }}
                    ></div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {post.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="hidden md:table-cell">
                    {new Intl.DateTimeFormat("de-DE", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                    }).format(post.createdAt)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                          <Link
                            href={
                              "/dashboard" +
                              (events ? "/veranstaltungen" : "/aktuelles") +
                              "/edit" +
                              "/" +
                              post.slug
                            }
                          >
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <AlertDialog>
                          <DropdownMenuItem>
                            <AlertDialogTrigger
                              className="hover:cursor-default"
                              asChild
                            >
                              <Link href={"#"}>Delete</Link>
                            </AlertDialogTrigger>
                          </DropdownMenuItem>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete your account and remove your
                                data from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                        <DropdownMenuItem>
                          <DashboardUpdateStatus data={post} />
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
