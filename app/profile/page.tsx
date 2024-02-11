"use client"
import Profile from "@/components/Profile"
import { Ipost } from "@/types"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const page = ({params}:{
    params:{
        id:string
    }
}) => {
    const {push} =useRouter()
    const [myPosts,setMyPosts]=useState([])
    const [profile,setProfile]=useState({})
    const username="lahcen"

    const handleEdit=async(prompt_id:string)=>{
        
            push(`/update-prompt?id=${prompt_id}`);
     
    }

    const handleDelete=async(prompt_id:string)=>{
        try {
            const res=await fetch(`/api/prompt/${prompt_id}`,{
                method:"DELETE"
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        const fetchpsost=async()=>{
            const response=await fetch(`/api/user/${params.id}/posts`)
            const prompts=await response.json()
            setMyPosts(prompts)
        }
        params?.id &&  fetchpsost()
    },[])
  return (
    <div>
      <Profile data={myPosts} name={username} desc={"hello"} handleEdit={handleEdit} handleDelete={handleDelete} />
    </div>
  )
}

export default page
