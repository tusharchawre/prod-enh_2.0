"use client"

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useQuery } from "convex/react";
import { MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { Title } from "./title";
import { Banner } from "./banner";
import { Menu } from "./Menu";




interface NavbarProps {
    isCollapsed: boolean;
    onResetWidth: ()=> void
}





export const Navbar = ({
    isCollapsed,
    onResetWidth
}: NavbarProps) =>{
    const params = useParams()
    const document = useQuery(api.documents.getById, {documentId: params.documentId as Id<"documents"> , userId: JSON.stringify(useCurrentUser()?.id)});

    if (document ===  undefined){
        return (
            <nav className=" px-3 py-3 w-full flex justify-between items-center ">
                <Title.Skeleton />
                <div className="flex items-center gap-x-2">
                    <Menu.Skeleton />
                </div>
            </nav>
        )
    }


    if (document ===  null){
        return null;
    }




    return(
        <>
        <nav className="bg-transparent rounded-sm px-3 py-3 w-full flex items-center gap-x-4">
            {isCollapsed && (
                <MenuIcon 
                role="button"
                onClick={onResetWidth}
                className="h-6 w-6 text-muted-foreground"
                />
            )}
            <div className="flex  items-center justify-between w-full">
                <Title initialData={document}/>
                <div className="flex items-center gap-x-2">
                    <Menu documentId={document._id}/>
                </div>
            </div>
        </nav>
        {document.isArchived &&(
            <Banner documentId={document._id} />
        )}
        </>
    )
}