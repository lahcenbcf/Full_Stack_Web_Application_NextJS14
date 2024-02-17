import {Prompt} from "@/models/prompt"
export const GET =async(request:Request,{params}:{
    params:{
        id:string
    }
})=>{

    
    try {
        console.log(params.id)
        const prompts=await Prompt.find({
            author:params.id
        }).populate("author")
        return new Response(JSON.stringify(prompts),{
            status:200
        })
    } catch (error) {
        return new Response("serveur error",{status:500})
    }
}