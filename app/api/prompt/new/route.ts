import { Prompt } from "@/models/prompt"
import {connectToDB} from "@/utils/database"

export const POST=async(request:Request)=>{
    try {
        await connectToDB()
        const { author, title, tag } = await request.json();
console.log(title,author)
        await Prompt.create({
            author,
            title,
            tag
        })
        return new Response("true",{
            status:201
        })
    } catch (error) {
        return new Response("serveur error",{
            status:500
        })
    }
}