"use client";

import { createPost } from "@/app/actions/posts";
import { useAppContext } from "@/context/AppContext";
import { uploadImage } from "@/supabase/storage/upload-img";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";

const Createpost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [postImg, setPostImg] = useState<File | null>(null);

  const { user } = useAppContext();
  const [isPending, startTransition] = useTransition();

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const imageFile = e.target.files[0];
      setPostImg(imageFile);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    startTransition(async () => {
      e.preventDefault();

      if (!title || !description || !tags || !postImg) {
        toast.error("Enter all details");
        return;
      }

      let imgUrl: string | null = "";
      if (postImg) {
        imgUrl = await uploadImage(postImg);
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("tags", tags);

      if (user) {
        console.log("user details:", user?.id, user?.user_metadata);
        formData.append("userId", user?.id);
        formData.append("username", user?.user_metadata?.username);
      }

      if (imgUrl) {
        formData.append("image", imgUrl);
      }

      const res = await createPost(formData);

      if (res.success) {
        toast.success(res.message);
        setDescription("");
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2 className="mb-5">Share the Moments</h2>

        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="input-form"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            className="input-form"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="description">tags</label>
          <input
            type="text"
            id="tags"
            name="tags"
            className="input-form"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="description">Upload Image</label>
          <input
            type="file"
            name="image"
            id="image"
            placeholder="select image"
            onChange={handleFile}
          />
        </div>

        <button
          className={`my-2 px-5 py-2 text-white rounded bg-green-700 ${
            isPending ? "opacity-70" : ""
          }`}
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Posting" : "Post"}
        </button>
      </form>
    </>
  );
};

export default Createpost;
