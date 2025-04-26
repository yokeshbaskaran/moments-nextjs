import { formatDate } from "@/helpers/helpers";
import { SinglePostProps } from "@/helpers/types";
import Image from "next/image";

const Singlepost = ({ post }: SinglePostProps) => {
  return (
    <div className="w-full max-w-sm bg-white border border-gray-300 rounded-lg shadow flex flex-col gap-3">
      {/* Post Header */}
      <div className="p-2 flex items-center justify-between">
        <div className="flex items-center space-x-1">
          {/*
          <Image
            src="/avatar.png"
            alt="User avatar"
            width={30}
            height={30}
            className="rounded-full"
          />  
          */}

          <span className="text-gray-700 font-semibold capitalize">
            {post.username}
          </span>
          <span className="text-gray-500">.</span>
          <span className="text-gray-700 font-semibold text-sm lowercase">
            @{post.username}
          </span>
        </div>

        <span className="text-gray-400 text-sm">
          {formatDate(post.createdAt)}
        </span>
      </div>

      {/* Post Image */}
      {post.image && (
        <div className="w-full h-48 relative">
          <Image
            src={post.image}
            alt="post-img"
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
      )}

      {/* Post Content */}
      <div className="px-1 flex flex-col space-y-2">
        <div className="flex flex-wrap gap-2 mt-2">
          {post.tags && (
            <span className="text-xs text-blue-500 bg-blue-100 px-2 py-1 rounded">
              {post.tags}
            </span>
          )}
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
