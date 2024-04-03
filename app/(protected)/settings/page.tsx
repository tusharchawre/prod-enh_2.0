"use client"

import { useCurrentUser } from "@/hooks/use-current-user"
import { useSession } from "next-auth/react"




const SettingsPage = () =>{

    const user = useCurrentUser()

    return(
        <div>
         


        <form>
            <button type="submit">Sign Out</button>
        </form>
        </div>
    )
}

export default SettingsPage