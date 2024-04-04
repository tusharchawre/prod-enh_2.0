"use client"

import { Doc, Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";

import { TitleList } from "./list-title";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useCurrentUser } from "@/hooks/use-current-user";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Check, CircleCheck,  ImageIcon, Trash } from "lucide-react";
import { useState } from "react";
import { ToDoModal } from "@/components/modals/to-do-modal";
import { Skeleton } from "@/components/ui/skeleton";






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
   

    if ( list.content === undefined) {
        return (
            <div className="flex flex-col items-center">
        <ToDoModal initialData={list}>
        <div className="flex flex-col items-center">
        <div
         onClick={onClick}
         role="button"
       
        style={{paddingLeft: "12px"}}
        className={cn(" relative group h-64 w-64 text-sm flex flex-col py-1 pr-3 bg-black/40  hover:bg-slate-600  items-center text-white font-medium rounded-md",
        active && "bg-slate-700 text-white/70",


        )}
        >
           
         <span className="text-lg truncate w-full rounded-sm bg-black/30">{label}</span>







         <div className=" h-2"/>
         <span className="w-full text-left">   
         </span>
         <div onClick={onArchive}>
         <Button  size="icon" className="absolute bottom-5 right-5" >
         <Trash className="h-4 w-4" />
         </Button>

         </div>
       <div onClick={toggleItemStatus}>
         <Button  size="icon" variant="destructive" className={cn("absolute bottom-5 right-15",
         isfinished && "bg-green-600 hover:bg-green-800")} >
         <Check className="h-4 w-4" />
         </Button>

         </div>

      
            
        </div>

         </div>


            </ToDoModal>
            <TitleList initialData={list}/>
            </div>
        ) ;
    }

    


    const contents = JSON.parse(list.content)










    return(
      <div className="flex flex-col items-center">
        <ToDoModal initialData={list}>
        <div className="flex flex-col items-center">
        <div
         onClick={onClick}
         role="button"
       
        style={{paddingLeft: "12px"}}
        className={cn(" relative group h-64 w-64 text-sm flex flex-col py-1 pr-3 bg-black/40  hover:bg-slate-600  items-center text-white font-medium rounded-md",
        active && "bg-slate-700 text-white/70",


        )}
        >
           
         <span className="text-lg truncate w-full rounded-sm bg-black/30">{label}</span>







         <div className=" h-2"/>
         <span className="w-full text-left">   


         {contents.map((contentItem: { content: any, type: string }, index: number) => (
        <div key={index}>
          {/* Check type attribute */}
          {contentItem.type === 'bulletListItem' && (
            <ul style={{ listStyleType: 'disc', textAlign: 'left' }} className="px-6">
              {contentItem.content.map((item: { text: string }, innerIndex: number) => (
                <li key={innerIndex}>
                  {/* Render each item from contentshit */}
                  {item.text}
                </li>
              ))}
            </ul>
          )}
          {contentItem.type === 'image' && (
            <div className="px-3">
              {/* Render image as icon */}
              <ImageIcon />
            </div>
          )}
          {/* Render plain text for other types */}
          {contentItem.type !== 'bulletListItem' && contentItem.type !== 'image' && (
            <div >
              {contentItem.content.map((item: { text: string }, innerIndex: number) => (
                <span key={innerIndex}>
                  {/* Render each item from contentshit */}
                  {item.text}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}

</span>
         <div onClick={onArchive}>
         <Button  size="icon" className="absolute bottom-5 right-5" >
         <Trash className="h-4 w-4" />
         </Button>

         </div>
       <div onClick={toggleItemStatus}>
         <Button  size="icon" variant="destructive" className={cn("absolute bottom-5 right-15",
         isfinished && "bg-green-600 hover:bg-green-800")} >
         <Check className="h-4 w-4" />
         </Button>

         </div>

      
            
        </div>

         </div>


            </ToDoModal>
            <TitleList initialData={list}/>
            </div>
    )
        
     
}



ListItem.Skeleton = function ListSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{
        paddingLeft: level ? `${(level * 12) + 25}px` : "12px"
      }}

    >

      <Skeleton className="h-64 w-64 bg-white/40" />
    </div>
  )
}