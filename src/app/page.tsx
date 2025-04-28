"use client";

import Createpost from "@/components/Createpost";
import AllPosts from "@/components/AllPosts";
import { useAppContext } from "@/context/AppContext";
import WelcomeBox from "@/components/WelcomeBox";

export default function Home() {
  const { user } = useAppContext();

  return (
    <>
      <div className="max-md:py-14">
        {user ? (
          <>
            <Createpost />
          </>
        ) : (
          <>
            <WelcomeBox />
          </>
        )}

        <AllPosts />
      </div>
    </>
  );
}
