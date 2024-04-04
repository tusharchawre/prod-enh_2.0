"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/convex/_generated/api"
import { Doc } from "@/convex/_generated/dataModel"
import { useMutation } from "convex/react"
import { useRef, useState } from "react"

import { useScreen } from "usehooks-ts"





interface TitleListProps {
    initialData: Doc<"lists">
}








export const TitleList = ({initialData}:TitleListProps) =>{
    const inputRef = useRef<HTMLInputElement>(null);

    const [title, setTitle] = useState(initialData.title || "Untitled")

    const enableInput = () =>{
        setTitle(initialData.title)
        setIsEditing(true)
        setTimeout(()=>{
            inputRef.current?.focus();
            inputRef.current?.setSelectionRange(0, inputRef.current.value.length)
        }, 0)
    }

    const disableInput = () => {
        setIsEditing(false)
    }

    const onChange = (
        event: React.ChangeEvent<HTMLInputElement>
    )=>{
        setTitle(event.target.value)
        update({
            id: initialData._id,
            title: event.target.value || "Untitled"
        })
    }

    const onKeyDown = (
        event: React.KeyboardEvent<HTMLInputElement>
    ) =>{
        if(event.key === "Enter"){
            disableInput
        }
    }



    const update = useMutation(api.lists.update)



const [isEditing, setIsEditing] = useState(false)


    return(
        <div className="flex items-center gap-x-1">
          
            {isEditing ?(
                <Input 
                ref={inputRef}
                onClick={enableInput}
                onBlur={disableInput}
                onChange={onChange}
                onKeyDown={onKeyDown}
                value={title}
                className="h-7 px-1 mt-2 text-black text-center focus:ring-transparent "
                />
            ):(
                <Button
                onClick={enableInput}
                variant="ghost"
                size="sm"
                className=" font-semibold h-auto p-1 mt-2"
                >
                    <span className="truncate">
                    {initialData.title}

                    </span>
                </Button>
            )}
        </div>
    )
}

TitleList.Skeleton = function TitleSkeleton() {
    return(
        <Skeleton className="h-64 w-64 bg-white/40 rounded-md"/>
    )
}