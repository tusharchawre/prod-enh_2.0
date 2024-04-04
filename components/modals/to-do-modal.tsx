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
import Editor from "../editor";
import { DatePickerDemo } from "../date-picker";



interface ToDoModalProps  {
    children: React.ReactNode
    initialData: Doc<"lists">
}








export const ToDoModal = ({children , initialData} : ToDoModalProps) =>{

    const update = useMutation(api.lists.update);

    const onChange = (content: string) => {
      update({
        id: initialData._id,
        content
      });
    };


    
    const isDeadlineOverdue = () => {
        if (!initialData.deadline) {
            return null; // If deadline is undefined, it's not overdue
        }
        
        const currentDateTime = Date.now();
        const deadlineDateTime = new Date(JSON.parse(initialData.deadline)).getTime() // Convert string to Date object
        return currentDateTime > deadlineDateTime;


    };












    return(
        <>
        <Dialog>
            <DialogTrigger  >
            {children}
            </DialogTrigger>
            
            <DialogContent className="flex flex-col text-black h-96 items-center ">


                <TitleList initialData={initialData}  />
                    <DatePickerDemo initialData={initialData}   />

                   

                <div className="w-full h-full rounded-md bg-[#1F1F1F] overflow-auto">

            <Editor
            
            
            onChange={onChange}
            initialContent={initialData.content}
            
            />
                </div>
            {isDeadlineOverdue() ? (
                <div className="text-white py-2 bg-red-500 w-full rounded-md text-center">Work! Deadline is Overdue. </div>
            ):(
                <div className="text-white py-2 bg-green-500 w-full rounded-md text-center">Chill! You have time.</div>
            )}
                
            </DialogContent>

        </Dialog>
        </>
    )
}