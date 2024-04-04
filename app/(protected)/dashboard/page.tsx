"use client"
import { useCurrentUser } from "@/hooks/use-current-user"
import { UserItemDash } from "../_components/user-item-dashboard"
import { NotesCount } from "../_components/notes-count"
import { useRouter } from "next/navigation"
import { ProcrastinationScore } from "../_components/procrast-score"
import { CalendarPage } from "../_components/calender"
import { ToDoCount } from "../_components/list-count"



 const Dashboard = () =>{
  




    return(
        <>
        <UserItemDash />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
<div  className="text-5xl bg-transparent font-bold break-words outline-none text-[#CFCFCF] resize-none">
<h1>Hi,{useCurrentUser()?.name}</h1>
</div>



<div className="grid grid-cols-3 grid-rows-2 gap-4 my-10 ">


        <NotesCount  />
        <ProcrastinationScore />
        <ToDoCount />
        <CalendarPage />

</div>


        </div>

        </>
    )
}


export default Dashboard;