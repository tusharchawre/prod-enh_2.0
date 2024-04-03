"use client"

import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";

import { Item } from "./item";
import { cn } from "@/lib/utils";
import { FileIcon } from "lucide-react";


interface DocumentListProps{
    userId: string;
    level?: number;
    data?: Doc<"documents">
}



export const DocumentList = ({
    userId,
    level = 0

}:DocumentListProps) =>{
    const params = useParams();
    const router = useRouter()


    const documents = useQuery(api.documents.getSidebar,{
        userId: userId

    })

    const onRedirect = (documentsId: string) => {
        router.push(`/notes/${documentsId}`)
    }

    if (documents === undefined) {
        return (
          <>
            <Item.Skeleton level={level} />
            {level === 0 && (
              <>
                <Item.Skeleton level={level} />
                <Item.Skeleton level={level} />
              </>
            )}
          </>
        );
      };

    return(
        <>
       <p
        style={{
          paddingLeft: level ? `${(level * 12) + 25}px` : undefined
        }}
        className={cn(
          "hidden text-sm font-medium text-muted-foreground/80",

          level === 0 && "hidden"
        )}
      >
        No pages inside
      </p>
      {documents.map((document) => (
        <div key={document._id}>
          <Item
            id={document._id}
            onClick={() => onRedirect(document._id)}
            label={document.title}
            icon={FileIcon}
            documentIcon={document.icon}
            active={params.documentId === document._id}
            level={level}

          />
          
        </div>
      ))}


        </>
    )
}