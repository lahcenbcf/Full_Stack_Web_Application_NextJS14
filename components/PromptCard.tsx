"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {Ipost} from "@/types/index"
const PromptCard = ({ post , handleDelete, handleTagClick }:{
    post : Ipost,
    handleDelete?:()=>void,
    handleTagClick?:(v:string)=>void | null
}) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [copied, setCopied] = useState("");

  const handleProfileClick = () => {
    if (post.author._id === session?.user.id) return router.push("/profile");
    router.push(`/profile/${post.author}?name=${post.author}`);
  };


  const handleCopy = () => {
    setCopied(post.title);
    navigator.clipboard.writeText(post.title);
    setTimeout(() => setCopied(""), 3000);
  };

  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div
          className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
          onClick={handleProfileClick}
        >
          <Image
            src={post.author.image}
            alt='user_image'
            width={40}
            height={40}
            className='rounded-full object-contain'
          />

          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>
              {post.author.username}
            </h3>
            <p className='font-inter text-sm text-gray-500'>
              {post.author.email}
            </p>
          </div>
        </div>

        <div className='copy_btn' onClick={handleCopy}>
          <Image
            src={
              copied === post.author.image
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post.title ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className='my-4 font-satoshi text-sm text-gray-700'>{post.title}</p>
      <p
        className='font-inter text-sm blue_gradient cursor-pointer'
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>

      {session?.user.id === post.author._id && (
        <div className='mt-5 flex justify-end gap-4 border-t border-gray-100 pt-3'>
          <Link
          href={`/update-prompt/${post._id}`}
            className='font-inter font-bold text-sm green_gradient cursor-pointer'
          >
            Edit
          </Link>
          <p
            className='font-inter text-sm font-bold text-red-500 cursor-pointer'
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;