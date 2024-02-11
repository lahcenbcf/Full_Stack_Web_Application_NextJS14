import {Prompt} from "@/models/prompt"
import {connectToDB} from "@/utils/database"
export const GET=async(request:Request,{params}:{
    params:{
        id:string
    }
})=>{

    try {
        await connectToDB()
       const prompt=await Prompt.findById(params.id).populate("author");
        return new Response(JSON.stringify({
            prompt
        }),{status:200})
    } catch (error:any) {
        return new Response(error.message,{
            status:500
        })
    }
}


export const PATCH=async(request:Request,{params}:{
    params:{
        id:string
    }
})=>{
    try {
        await connectToDB()
        const {tag,title}=await request.json()
        const existingPrompt=await Prompt.findById(params.id)
        if(existingPrompt){
            existingPrompt.title=tag;
            existingPrompt.tag=title;
            await existingPrompt.save()
        }else{
            return new Response("ressource not found",{
                status:404
            })
        }
    } catch (error:any) {
        return new Response(error.message,{
            status:500
        }) 
    }
}

export const DELETE=async(request:Request,{params}:{
    params:{
        id:string
    }
})=>{
    try {
        await connectToDB()
        await Prompt.findByIdAndDelete(params.id)
        return new Response("deleted successufully",{
            status:200
        })
    } catch (error:any) {
        return new Response(error.message,{
            status:500
        }) 
    }
}