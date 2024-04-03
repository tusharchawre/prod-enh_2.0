"use client"

import { signOut, useSession } from "next-auth/react"





export const SignOutButton = () =>{
    const session = useSession()
    const onClick = () =>{
        signOut()
    }

    return(
        <button onClick={onClick} type="submit">
            Sign Out
            </button>
    )

}