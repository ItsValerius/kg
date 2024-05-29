import { redirect } from "next/navigation";
import { signOut } from "../dashboard/actions";

export const dynamic = "force-dynamic"; // defaults to auto
export async function GET() {
  await signOut();
  return redirect("/");
}
