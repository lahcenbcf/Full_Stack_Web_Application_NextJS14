import { getServerSession } from "next-auth";

const getCurrentUser=async()=>{
    try {
        const session=await getServerSession()
        return session
    } catch (error) {
        console.log(error)
    }
}



export {getCurrentUser}