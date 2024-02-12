import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import {connectToDB} from "@/utils/database"
import {User} from "@/models/user"
const handler=NextAuth({
    providers:[
        GoogleProvider({
            clientId:process.env.CLIENT_ID!,
            clientSecret:process.env.CLIENT_SECRET!
        }),
        
    ],
    callbacks:{
        async session({session}
        ){
            
            await connectToDB()
            const userSession=await User.findOne({
                email:session.user?.email
            })
            session.user.id=userSession._id.toString()
            return session
        },
        /*async signIn({profile,user,credentials}){
            try {
                await connectToDB()
                const userExist=await User.findOne({
                    email:profile?.email
                })

                if(!userExist){
                await User.create({
                    email:profile?.email,
                    username:profile?.name?.replace(" ",""),
                    image:user?.image
                })
                }
                return true
            } catch (error) {
                console.log(error)
                return false
            }
        }*/
    }

})


export {handler as GET,handler as POST}