

import { auth, signOut } from "@/auth"
import { Navigation } from "../_components/Navigation"

import "../notes/notes.css"
import { SessionProvider, useSession } from "next-auth/react"
import { RingLoader } from "react-spinners"
import { SearchCommand } from "@/components/search-command"





export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {









    return (

      
      <div className="main">

<div className="blur"></div>
        <div className="tealblob2"></div>
      <div className="purblob2"></div>



      <div className="h-full flex pane glassblur">




      <main className="flex-1 h-full overflow-y-auto ">
        <SearchCommand />
      {children}
      </main>

           
        
      </div>
      </div>
    )
  }