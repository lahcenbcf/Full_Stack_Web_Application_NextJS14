"use client"
import { useEffect, useState } from "react"
import SearchBar from "./SearchBar"
import PromptCard from "./PromptCard"
import { Ipost } from "@/types"


const PromptList=({
    data,handleTagClick
}:{
    data:Array<Ipost>,
    handleTagClick:(v:string)=>void
})=>{
    return (
        <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          handleDelete={()=>{}}
          handleEdit={()=>{}}
        />
      ))}
    </div>
    )
}


const Feed = () => {

    const [searchText,setSearchText]=useState("")
    const [searchRes,setSearchRes]=useState<Ipost[]>([])
    const [prompts,setPrompts]=useState<Ipost[]>([])
    const submitSearch=async(e:React.SyntheticEvent)=>{
                e.preventDefault()
                console.log(searchText)
                setSearchRes(prompts.filter(p=>p.title.includes(searchText)))
    }


    const handleTagClick=(tag:string)=>{
        setSearchText(tag)
    }

    useEffect(()=>{
        (async()=>{
            const response=await fetch("/api/prompt",{
                method:"GET"
            })
            const data=await response.json()
            setPrompts(data)
            setSearchRes(data)
        })()
    },[])
  return (
    <div className="container w-full mx-auto px-4">
            <SearchBar searchText={searchText} setSearchText={setSearchText} searchHandle={submitSearch} />
            {
                searchText ? <PromptList data={searchRes} handleTagClick={handleTagClick} /> : <PromptList data={prompts} handleTagClick={handleTagClick} />
            }
    </div>
  )
}

export default Feed
