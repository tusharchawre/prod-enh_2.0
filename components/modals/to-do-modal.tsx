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
    
 


    return(
        <>
        <Dialog>
            <DialogTrigger  >
            {children}
            </DialogTrigger>
            
            <DialogContent className="flex flex-col h-96 items-center ">


                <TitleList initialData={initialData}  />

                <div className="w-full h-full rounded-md bg-[#1F1F1F]">

            <Editor
            
            
            onChange={onChange}
          initialContent={initialData.content}

        />
                </div>
                
            </DialogContent>

        </Dialog>
        </>
    )
}