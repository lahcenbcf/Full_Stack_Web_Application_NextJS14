"use client"
import Profile from "@/components/Profile"
import { useSession } from "next-auth/react"
import { useRouter} from "next/navigation"
import { useEffect, useState } from "react"

const page = () => {
    const {data:session}=useSession()
    const {push} =useRouter()
    const [myPosts,setMyPosts]=useState([])

    const handleDelete=async(prompt_id:string)=>{
        try {
            const res=await fetch(`/api/prompt/${prompt_id}`,{
                method:"DELETE"
            })
            push("/")
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        
        const fetchposts=async(userId:string)=>{
            const response=await fetch(`/api/users/${userId}/posts`)
            const prompts=await response.json()
            setMyPosts(prompts)
        }

        fetchposts(session?.user?.id!)
    },[])
  return (
    <div>
      <Profile data={myPosts} name={session?.user?.name !} desc={`welcome to ${session?.user?.name} profile !`} handleDelete={handleDelete} />
    </div>
  )
}

export default page
