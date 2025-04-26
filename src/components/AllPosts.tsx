"use client";

import { getPosts } from "@/app/actions/posts";
import { useEffect, useState } from "react";
import Singlepost from "./Singlepost";
import { Post } from "../helpers/types";

const AllPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    allPosts();
  }, []);

  const allPosts = async () => {
    const data = await getPosts();
    // console.log("posts-data", data);
    setPosts(data);
  };

  return (
    <div className="p-2">
      <h2 className="my-5 text-xl">AllPosts</h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {posts &&
          posts.map((post, idx) => <Singlepost key={idx} post={post} />)}

        {posts.length === 0 && (
          <div>
            <p>No posts created yet!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPosts;
