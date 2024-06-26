"use client"

import { DropdownMenu, DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
     DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useCurrentUser } from "@/hooks/use-current-user";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { ChevronUpIcon, LucideIcon, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "sonner";

interface ItemProps {
    id?: Id<"documents">;
    documentIcon?: string;
    active?: boolean;
    expanded?: boolean;
    isSearch?: boolean;
    level?: number;
    onExpand?: ()=>void;
    isNewNote?: boolean;


    label: string;
    onClick?: ()=>void;
    icon: LucideIcon
}







export const Item = ({
    id,
    label,
    onClick,
    icon:Icon,
    active,
    documentIcon,
    isSearch,
    isNewNote,
    level = 0,
    onExpand,
    expanded,
}:ItemProps) => {

  const user = useCurrentUser()


    const archive = useMutation(api.documents.archive)

    const onArchive = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    )=>{
        event.stopPropagation()
        if(!id) return;
        const promise = archive({id})

        toast.promise(promise , {
            loading: "Moving to trash",
            success: "Note Moved to Archive",
            error: "Failed to achive note"
        })
    }
    

    return(
        <div
        onClick={onClick}
        role="button"
        style={{paddingLeft: "12px"}}
        className={cn("group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-slate-600 flex  text-white font-medium items-center",
        active && "bg-slate-700 text-white/70",
        isSearch && "min-h-[27px] items-center border-none",
        isNewNote && "min-h-[27px] items-center border-none",
        )}
        >
            {!!id && (
                <div></div>
            )}

                {documentIcon ?(
                    <div className="shrink-0 mr-2 text-[18px]">
                        {documentIcon}
                    </div>
                ) : 




            (<Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground"/>)}

            <span className="truncate">{label}</span>
            {isSearch &&(
                        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-slate-400 bg-slate px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">

                    <span className="text-xs">⌘</span>K
                </kbd>
            )}
            {!!id &&(
               <div className="ml-auto flex items-center gap-x-2">
               <DropdownMenu>
                 <DropdownMenuTrigger
                   onClick={(e) => e.stopPropagation()}
                   asChild
                 >
                   <div
                     role="button"
                     className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-600"
                   >
                     <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                   </div>
                 </DropdownMenuTrigger>
                 <DropdownMenuContent
                className="w-60" 
                align="start" 
                side="right"
                forceMount
                 >
                    <DropdownMenuItem  onClick={onArchive} >
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="opacity-35"/>
                    <div className="text-xs text-muted-foreground p-2">
                        Last edited by: {user?.name}
                    </div>

                 </DropdownMenuContent>
                 </DropdownMenu>
                  </div>
            )}
        
        </div>
        

    )
        
     

    
}



Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
    return (
      <div
        style={{
          paddingLeft: level ? `${(level * 12) + 25}px` : "12px"
        }}
        className=" flex gap-x-2 py-[3px]"
      >
        <Skeleton className="h-4 w-4 bg-white/40" />
        <Skeleton className="h-4 w-[30%] bg-white/40" />
      </div>
    )
  }