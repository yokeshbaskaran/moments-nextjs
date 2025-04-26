import Createpost from "@/components/Createpost";
import AllPosts from "@/components/AllPosts";

export default function Home() {
  return (
    <>
      <div className="my-5 p-5">
        <Createpost />

        <AllPosts />
      </div>
    </>
  );
}
