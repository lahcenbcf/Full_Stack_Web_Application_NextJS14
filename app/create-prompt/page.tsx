"use client"
import Form from "@/components/Form"
import { Ipost } from "@/types"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
const page = () => {
  const [post,setPost]=useState<Ipost|null>(null)
  const [submitting,setSubmitting]=useState(false)
  const {data:session}=useSession()
  const router=useRouter()
  const submitForm=async(e:React.SyntheticEvent)=>{
    try {
      e.preventDefault();
      setSubmitting(true)
      const response=await fetch("/api/prompt/new",{
        method:"POST",
        body:JSON.stringify({
          author:session?.user.id,
          title:post?.title,
          tag:post?.tag
        })
      })

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error)
    }finally{
      setSubmitting(false)
    }
  }
  return (
    <div>
      <Form type="create" post={post} setPost={setPost} submitting={submitting} handleSubmit={submitForm} />
    </div>
  )
}

export default page
