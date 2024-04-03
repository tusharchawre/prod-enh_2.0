"use client"
import { ChevronsLeftRight } from "lucide-react"

import { DotLoader, RingLoader } from "react-spinners"

import {
    Avatar,
    AvatarImage
} from "@/components/ui/avatar"

import { SignOutButton } from "./sign-out-button"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { useSession } from "next-auth/react";
import { useCurrentUser } from "@/hooks/use-current-user"






export const UserItem = () =>{
    
    const { data: session, status } = useSession()
    
    const user = useCurrentUser()





    return(<>
    <DropdownMenu>
        <DropdownMenuTrigger>
            <div role="button" className="flex items-center text-sm p-3 w-full hover:bg-primary/5">
            { status === "loading" && (<div ><RingLoader  size={10} color="#ffffff" /></div>) }
                <div className="gap-x-2 flex items-center max-w-[150px]">
                   
                    <Avatar className="h-5 w-5">

                        <AvatarImage src={user?.image!} />

                    </Avatar>
                    { status !== "loading" && (<div ><span className="text-star font-medium line-clamp-1">
                        {user?.name}&apos;s Notes
                        </span></div>) }
                        
                </div>
                <ChevronsLeftRight className="rotate-90 ml-2 text-muted-foreground h-4 w-4"/>
            </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
        className="w-70"
        align="start"
        alignOffset={11}
        forceMount
        >
            <div className="flex flex-col space-y-4 p-2">
                <p className="text-sx font-medium leading-none text-muted-foreground">
                    {user?.email}
                </p>
                <div className="flex items-center gap-x-2">
                    <div className="rounded-md bg-secondary p-1">
                        <Avatar>
                            <AvatarImage src={user?.image!}/>
                        </Avatar>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm line-clamp-1">
                            {user?.name}&apos;s Notes
                        </p>
                    </div>

                </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="w-full cursor-pointer text-muted-foreground">
                <SignOutButton />
            </DropdownMenuItem>
        </DropdownMenuContent>

    </DropdownMenu>
    </>)
}