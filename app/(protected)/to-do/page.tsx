"use client"


import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useMutation, useQuery } from "convex/react";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { ListItem } from "./_components-list/list-item";
import { Item } from "../_components/item";
import { useRouter } from "next/navigation";







const page = () => {
    const user = useCurrentUser()
    const router = useRouter()

    const lists = useQuery(api.lists.getList , {userId : JSON.stringify(useCurrentUser()?.id)})

    const create = useMutation(api.lists.create)

    const onCreate = () => {
        const promise = create({ title: "Untitled" , userId: JSON.stringify(user?.id)})

    
        toast.promise(promise, {
          loading: "Creating a new list...",
          success: "New list created!",
          error: "Failed to create a new list."
        });
      };


      if (lists === undefined) {
        return (
          <>
            <Item.Skeleton level={0} />
            
          </>
        );
      };





    return ( <>
    <div className="h-full w-full ">

        <div className="m-10 flex flex-wrap gap-10 justify-center flex-row-reverse">
          
        {lists.map((list) => (
        <div key={list._id}>

          <ListItem
            isfinished={list.finished}
            id={list._id}
            onClick={()=>{}}
            label={list.title}
          />
          

          
        </div>
      ))}

        </div>






    <div className="absolute bottom-10 right-10">

    <Button onClick={onCreate}>
            <PlusCircle className="h-4 w-4 mr-2" />
        <p>Create a list </p>

        </Button>
    </div>
    
    </div>
    </>
     );
}
 
export default page;