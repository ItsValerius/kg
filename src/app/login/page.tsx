import { Input } from "@/components/ui/input";
import { createClient } from "@/server/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/dashboard");
  };

  // const signUp = async (formData: FormData) => {
  //   "use server";

  //   const origin = headers().get("origin");
  //   const email = formData.get("email") as string;
  //   const password = formData.get("password") as string;
  //   const supabase = createClient();

  //   const { error } = await supabase.auth.signUp({
  //     email,
  //     password,
  //     options: {
  //       emailRedirectTo: `${origin}/auth/callback`,
  //     },
  //   });

  //   if (error) {
  //     console.log(error.message);

  //     return redirect("/login?message=Could not authenticate user");
  //   }

  //   return redirect("/login?message=Check email to continue sign in process");
  // };

  return (
    <main>
      <div className="max-w-5xl mx-auto flex justify-center items-center h-full">
        <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 ">
          <Link
            href="/"
            className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>{" "}
            Back
          </Link>

          <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
            <label className="text-md" htmlFor="email">
              Email
            </label>
            <Input
              className=" px-4 py-2  mb-6 focus-visible:ring-emerald-500/50"
              name="email"
              placeholder="you@example.com"
              required
            />
            <label className="text-md" htmlFor="password">
              Passwort
            </label>
            <Input
              className="px-4 py-2  mb-6 focus-visible:ring-emerald-500/50"
              type="password"
              name="password"
              placeholder="••••••••"
              required
            />
            <SubmitButton
              formAction={signIn}
              className="bg-emerald-600 text-white rounded-md px-4 py-2 text-foreground mb-2"
              pendingText="Logging In..."
            >
              Login
            </SubmitButton>
            {searchParams?.message && (
              <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                {searchParams.message}
              </p>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}
