"use client";

import Createpost from "@/components/Createpost";
import AllPosts from "@/components/AllPosts";
import Link from "next/link";
import Logout from "@/components/Logout";
import { useAppContext } from "@/context/AppContext";

export default function Home() {
  const { user } = useAppContext();

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
