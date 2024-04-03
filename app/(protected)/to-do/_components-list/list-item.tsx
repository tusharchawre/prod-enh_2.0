"use client"

import { Doc, Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";

import { TitleList } from "./list-title";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useCurrentUser } from "@/hooks/use-current-user";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Check, CircleCheck, Trash } from "lucide-react";
import { useState } from "react";





interface ListItemProps {
    id: Id<"lists">;
    active?: boolean;
    content?: Doc<"lists">;
    isfinished: boolean

    label: string;
    onClick?: ()=>void;

}

export const ListItem = ({id,active,label,onClick, content, isfinished}:ListItemProps) =>{

    const [isItemFinished, setIsItemFinished] = useState(!isfinished);

    const list = useQuery(api.lists.getById, {documentId: id as Id<"lists"> , userId: JSON.stringify(useCurrentUser()?.id)});
    const archive = useMutation(api.lists.remove)
    const done  = useMutation(api.lists.getDone)
    const notdone  = useMutation(api.lists.notDone)





    if (list ===  undefined){
        return (
            <nav className=" px-3 py-3 w-full flex justify-between items-center ">
                <TitleList.Skeleton />
                
            </nav>
        )
    }


    const onArchive = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    )=>{
        event.stopPropagation()
        if(!id) return;
        const promise = archive({id})

        toast.promise(promise , {
            loading: "Deleting List",
            success: "List is Deleted",
            error: "Failed to delete list"
        })
    }
    

    

      



    const onDone = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    )=>{
        event.stopPropagation()
        if(!id) return;
        const promise = done({id})

        toast.promise(promise , {
            loading: "Marking list as completed",
            success: "Job done.",
            error: "Failed to mark complete"
        })
    }
    

    const notDone = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    )=>{
        event.stopPropagation()
        if(!id) return;
        const promise = notdone({id})

        toast.promise(promise , {
            loading: "Marking list as uncomplete.",
            success: "Job Unticked.",
            error: "Failed to mark incomplete"
        })
    }
    

    const toggleItemStatus = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation();
        if (!id) return;
        // Toggle the state between finished and not finished
        setIsItemFinished(prevState => !prevState);
        // Call the appropriate function based on the current state
        if (isItemFinished) {
            onDone(event);
        } else {
            notDone(event);
        }
    }
   






    return(
        <div className="flex flex-col items-center">
       
        <div
        onClick={onClick}
        role="button"
        style={{paddingLeft: "12px"}}
        className={cn(" relative group h-64 w-64 text-sm flex flex-col py-1 pr-3 bg-black/40  hover:bg-slate-600  items-center text-white font-medium rounded-md",
        active && "bg-slate-700 text-white/70",


        )}
        >
           
         <span className="truncate">{label}</span>
         <div className=""/>
         <span className="">{list.content}</span>

         <div onClick={onArchive}>
         <Button  size="icon" className="absolute bottom-5 right-5" >
         <Trash className="h-4 w-4" />
         </Button>

         </div>
       <div onClick={toggleItemStatus}>
         <Button  size="icon" variant="destructive" className={cn("absolute bottom-5 right-15",
         isfinished && "bg-green-600")} >
         <Check className="h-4 w-4" />
         </Button>

         </div>

      
            
        </div>
            <TitleList initialData={list}/>
         </div>

    )
        
     
}