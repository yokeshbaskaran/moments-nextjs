import { formatDate } from "@/helpers/helpers";
import { SinglePostProps } from "@/helpers/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { LuDot } from "react-icons/lu";
import { IoTrashOutline } from "react-icons/io5";
import { useAppContext } from "@/context/AppContext";
import toast from "react-hot-toast";
import { deletePost } from "@/app/actions/posts";
import { useQueryClient } from "@tanstack/react-query";

const Singlepost = ({ post }: SinglePostProps) => {
  // console.log("post.tags", post.tags);
  const [tags, setTags] = useState<string[]>([]);

  const { user } = useAppContext();

  useEffect(() => {
    const splitTags = () => {
      // console.log("post.tags", post.tags);
      const tags = post.tags;
      const allTags = tags.split(" ");
      // console.log("post.tags", allTags);
      setTags(allTags);
    };
    splitTags();
  }, [post]);

  //checking current username and post-user are same
  const isMyProfile = post?.username === user?.user_metadata?.username;

  const queryClient = useQueryClient();

  const handleDeletePost = async (postIid: string) => {
    if (confirm("Are you want to delete post!")) {
      try {
        const { errorMessage } = await deletePost(postIid);

        if (errorMessage) {
          toast.error(errorMessage);
        } else {
          toast.success("Post deleted successfully!");
          queryClient.invalidateQueries({ queryKey: ["posts"] });
        }
      } catch (error) {
        toast.error("Failed to delete post!");
        console.log("Error in deletePost:", error);
      }
    }
  };

  return (
    <div className="w-full max-w-sm my-2 md:my-5 bg-white border border-gray-300 rounded-lg shadow flex flex-col">
      {/* Post Header */}

      <div className="px-2 pt-3 flex items-center space-x-1">
        {/* user name ,img  */}

        <div className="flex items-center space-x-2">
          <RxAvatar color="#1d9bf0" size={30} />

          <span className="text-gray-700 font-semibold lowercase text-lg">
            @{post.username}
          </span>
        </div>

        <span className="text-gray-500">
          <LuDot size={20} />
        </span>

        <span className="text-gray-400 text-sm">
          {formatDate(post.created_at)}
        </span>

        {isMyProfile && (
          <button
            onClick={() => handleDeletePost(post.id)}
            className="px-2 py-2 ml-auto hover:bg-gray-200 rounded-full"
          >
            <IoTrashOutline color="red" />
          </button>
        )}
      </div>

      {/* Post Image */}
      {post.image && (
        <div className="w-full pt-2 h-[250px] object-cover cursor-pointer">
          <Image
            src={post.image}
            width={200}
            height={200}
            className="size-full object-contain"
            alt="Description of the image content"
          />
        </div>
      )}

      {/* Post Content */}
      <div className="px-3 pb-3 flex flex-col space-y-3">
        <div className="flex flex-wrap gap-2 mt-2">
          {post.tags &&
            tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs text-blue-500 bg-blue-100 px-3 py-1 rounded"
              >
                {tag}
              </span>
            ))}
        </div>

        <h2 className="text-xl font-bold text-gray-800">{post.title}</h2>

        <p className="text-gray-600 text-sm">{post.description}</p>
      </div>

      <div>
        {/* Footer - User and Metadata */}

        {/* <span >Post ID:</span> {post.id} */}
        {/* <span className="font-medium">{formatDate(post.updatedAt)}</span> */}
        {/* <span className="font-medium">User ID:</span> {post.userId} */}
      </div>
    </div>
  );
};

export default Singlepost;
