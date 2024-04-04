"use client"


import { Calendar } from "@/components/ui/calendar"
import React from "react"

export const CalendarPage = () =>{


    const [date, setDate] = React.useState<Date | undefined>(new Date())

return (
    <div className="glassblur h-64 w-64 flex items-center justify-center  col-start-1 col-span-1 row-start-2 row-span-1">
        <Calendar
    mode="single"
    selected={date}
    onSelect={setDate}
    className="rounded-md border-none shadow "

  />

    </div>
  
)

}



