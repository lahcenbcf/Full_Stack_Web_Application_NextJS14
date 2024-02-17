"use client"

import Profile from "@/components/Profile"
import { Iuser } from "@/types"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const page = ({params}:{
    params:{
        id:string
    }
}) => {
    const [userPrompts,setUserPrompts]=useState([])
    const [userInfo,setUserInfo]=useState<Iuser>({
        username:"",
        image:"",
        email:"",
        _id:""
    })
    const [loading,setLoading]=useState(false)
    const {push}=useRouter()
    useEffect(()=>{
        const fetchUserPosts=async()=>{
            try {
                const res=await Promise.all([await fetch(`/api/user/${params.id}/posts`),await fetch(`/api/user/${params.id}`)])
                res.map(async(response,order) => {
                        const data=await response.json()
                        !order ? setUserPrompts(data) : setUserInfo(data)
                })

            params.id ? fetchUserPosts() : push("/")
            setLoading(false)
            } catch (error) {
                console.log("error")
            }finally{
                setLoading(false)
            }
        }


        params.id ? fetchUserPosts() : push("/")
    })
    if(loading) return <div>loading .........</div>
  return (
    <div>
      <Profile data={userPrompts} name={userInfo?.username} desc={"hello"}  />
    </div>
  )
}

export default page
