//GET PROMPTS
import { Prompt } from "@/models/prompt"

export const GET =async(request:Request)=>{
    try {
        const prompts=await Prompt.find({}).populate("author")
        return new Response(JSON.stringify(prompts),{
            status:200
        })
    } catch (error) {
        return new Response("failed to fetch all prompts",{
            status:500
        })
    }
}

