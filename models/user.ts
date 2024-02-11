import {Schema,model,models} from "mongoose"

const userSchema=new Schema({
    email:{
        type:String,
        unique:[true,"email already exist"],
        required:[true,"email is required !"]
    },
    username:{
        type:String,
        required:[true,"username is required !"],
    },
    image:{
        type:String,
        required:[true]
    }
})

export const User =models.User || model("User",userSchema)


