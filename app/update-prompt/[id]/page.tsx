"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@/components/Form";

const UpdatePrompt = ({params}:{
  params:{
    id:string
  }
}) => {
  const router = useRouter();

  const [post, setPost] = useState({
    title:"",
    tag:""
  });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${params.id}`);
      const data = await response.json();
      setPost({
        title: data.prompt.title,
        tag: data.prompt.tag,
      });
    };

    if (params.id) getPromptDetails();
  }, [params.id]);

  const updatePrompt = async (e:React.SyntheticEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!params.id) return alert("Missing PromptId!");

    try {
      const response = await fetch(`/api/prompt/${params.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post?.title,
          tag: post?.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePrompt;