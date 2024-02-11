import { User } from "@/models/user";

export const GET=async(requset:Request,{params}:{
    params:{
    id:string
    }
})=>{
    try{
    const user = await User.findById(params.id)
    return new Response(JSON.stringify(user),{
        status:200
    })
}catch(error){
    console.log(error)
}
}


