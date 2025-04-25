"use client";

import { useAppContext } from "@/context/AppContext";

export default function Home() {
  const { user } = useAppContext();
  console.log("user", user);

  return (
    <>
      <div>
        <h2 className="text-xl">Next app is here</h2>
      </div>
    </>
  );
}
