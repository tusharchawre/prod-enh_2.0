
"use client"

import { TitleList } from "@/app/(protected)/to-do/_components-list/list-title";
import {
    Dialog,
    DialogTrigger,
    DialogHeader,
    DialogContent
} from "@/components/ui/dialog"
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useMutation, useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { Calendar } from "./ui/calendar";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import React from "react";
import { format } from "date-fns"







interface ToDoModalProps  {

  initialData: Doc<"lists">
}








export const DatePickerDemo = ({ initialData} : ToDoModalProps) =>{
  const [date, setDate] = React.useState<Date>()

  
  const update = useMutation(api.lists.update);
  
  
  const setDeadline = (deadline: typeof date) =>{
    update({
      id: initialData._id,
      deadline: JSON.stringify(deadline)
    });
    
  }
  
  
 


    return(
        <>
        <Dialog>
            <DialogTrigger className="flex justify-center" >
            <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal  ",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a Date</span>}
        </Button>
            </DialogTrigger>
            
            <DialogContent className="flex  h-96 justify-center w-full ">

            <Calendar

mode="single"
selected={date}
onSelect={event => {
  setDate(event)
  setDeadline(event)
}}
initialFocus
/>
                
            </DialogContent>

        </Dialog>
        </>
    )
}