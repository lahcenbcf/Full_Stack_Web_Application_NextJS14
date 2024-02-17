"use client"
import Link from "next/link"
import Image from "next/image"
import {useState} from "react"
import {signIn,signOut,useSession} from "next-auth/react"
const Navbar = () => {
    const {data:session}=useSession()
    const [open,setOpen]=useState(false)
   /* useEffect(()=>{
        (async()=>{
            const response=await getProviders();
            setProviders(response)
        })()

        console.log(providers)
    },[])*/
  return (
    <header className="container w-full mx-auto">
            <nav className="flex  justify-between items-center pt-4">
                <Link href={"/"} className="flex gap-2 items-center">
                        {/* logo */}
                        <Image src={"/assets/images/logo.svg"} alt="our_prompt_ai_logo" width={20} height={10} />
                        <p className="max-sm:hidden font-semibold text-lg">Promptai</p>
                </Link>  

                {/* Desktop navigation */}
                <div className="sm:flex hidden">
                        {
                            session?.user ? (
                                <div className="flex gap-3">
                                    <Link href={"/create-prompt"} className="black_btn" >create prompt</Link>
                                    <button className="outline_btn" type="button" onClick={()=>signOut()}>Signout</button>
                                    <Link href={`/profile?id=${session?.user?.id}`}>
                                        <Image src={session.user.image} width={34} height={35} className="object-cover rounded-full shadow-md" alt="profile_pic" />
                                    </Link>
                                </div>
                            ) : <div>
                                <button onClick={()=>signIn("google")} className="black_btn">sign In</button>
                            </div>
                        }
                </div>
                {/* mobile navigation */}
                <div className="sm:hidden flex relative">
                    {
                        session?.user ? (
                
                        <div className="flex" onClick={()=>setOpen(prev => !prev)}>
                            <Image src={session.user.image} alt="logo_mobile_screen" width={35} height={35} />
                            {open && <div className="dropdown">
                                <Link href={`/profile?id=${session?.user?.id}`} className="dropdown_link text-black" onClick={()=>setOpen(false)}>My profile</Link>
                                <Link href={"/create-prompt"} className="dropdown_link text-black" onClick={()=>setOpen(false)}>Create Prompt</Link>
                                <button type="button" className="black_btn" onClick={()=>{
                                    setOpen(false)
                                    signOut()}} >signOut</button>
                            </div>}
                        </div>
                       
                        ): <div>
                            <button onClick={()=>signIn("google")} className="black_btn">sign In</button>
                        </div>
                    }
                    
                </div>
              
            </nav>
    </header>
  )
}

export default Navbar
