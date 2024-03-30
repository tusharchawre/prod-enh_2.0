"use client"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button"

export const Socials = () =>{
    return(
        <>
        <div className="flex items-center w-full gap-x-2">
<Button size="lg" className="w-full" variant="outline" onClick={()=>{}}>
    <FcGoogle size="lg" className="h-5 w-5" />
</Button>
<Button size="lg" className="w-full " variant="outline" onClick={()=>{}}>
    <FaGithub size="lg" className="h-5 w-5 fill-black"  />
</Button>
        </div>
        </>
    )
}