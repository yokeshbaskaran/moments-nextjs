import Createpost from "@/components/Createpost";
import AllPosts from "@/components/AllPosts";
import { getUser } from "@/supabase/server";
import Link from "next/link";
import Logout from "@/components/Logout";

export default async function Home() {
  const user = await getUser();
  console.log("user from server", user);

  return (
    <>
      <div className="my-5 p-5">
        {user ? (
          <div className="flex flex-col items-center gap-4">
            <p>User is logged in as {user.email}</p>

            <Logout />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <p>Not logged in</p>

            <Link
              href="/authpage"
              className="bg-emerald-700 p-2 w-20 text-white rounded-lg text-center"
            >
              Login
            </Link>
          </div>
        )}

        <Createpost />

        <AllPosts />
      </div>
    </>
  );
}
