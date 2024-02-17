import mongoose from "mongoose"
let isConnected=false;


export const connectToDB=async()=>{
    mongoose.set("strictQuery",true)
    if(isConnected){
        return;
    }
    try {
        await mongoose.connect(`${process.env.MONGO_URI}`,{
            dbName:"prompt_db"
        })
        isConnected=true;
    } catch (error) {
        console.log(error)
    }   
    
}