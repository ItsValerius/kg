import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CancelButton from "../../@modal/(.)delete/[slug]/cancelButton";
import DeleteButton from "../../@modal/(.)delete/[slug]/deleteButton";

const DeleteAktuelles = ({ params }: { params: { slug: string } }) => {
  return (
    <main>
      <div className="p-4 flex">
        <Card>
          <CardContent>
            <CardHeader>
              <CardTitle>Are you absolutely sure? {params.slug}</CardTitle>
              <CardDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex gap-2">
              <CancelButton />
              <DeleteButton />
            </CardFooter>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default DeleteAktuelles;
