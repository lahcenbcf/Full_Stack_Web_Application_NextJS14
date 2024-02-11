import {Schema,model,models} from "mongoose"
import { User } from "./user"
const promptSchema=new Schema({
    title:{
        type:String,
        required:[true,"this prompt is required"]
    },
    tag:{
        type:String,
        required:[true]
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
})

export const Prompt=models.Prompt || model("Prompt",promptSchema)
