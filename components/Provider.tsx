"use client"
import { Session } from "next-auth"
import {SessionProvider} from "next-auth/react"
const Provider=({children}:{
    children : React.ReactNode
})=>{
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}


export default Provider