"use client"

import { auth } from "@/auth";

import "../notes/notes.css"
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

const NotesPage =  () => {
    const user = useCurrentUser()



    const create = useMutation(api.documents.create)

    const onCreate = () => {
        const promise = create({ title: "Untitled" , userId: JSON.stringify(user?.id)})

    
        toast.promise(promise, {
          loading: "Creating a new note...",
          success: "New note created!",
          error: "Failed to create a new note."
        });
      };


    return ( <>
    <div className="h-full flex flex-col items-center justify-center space-y-4">
        <h1>Welcome to {user?.name}&apos;s Notes.</h1>
        <Button onClick={onCreate}>
            <PlusCircle className="h-4 w-4 mr-2" />
        <p>Create a note </p>

        </Button>
    </div>
    </> );
}
 
export default NotesPage;