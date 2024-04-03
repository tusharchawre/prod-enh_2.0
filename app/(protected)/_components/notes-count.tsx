import { useEffect, useState } from "react";
import { api } from "@/convex/_generated/api";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useQuery } from "convex/react";
import { Item } from "./item";
import { useRouter } from "next/navigation";


export const NotesCount = () => {

  const [number, setNumber] = useState(0);
  const router = useRouter()

  const onClick = () => {
      router.push(`/notes`)
      
  }



  const documents = useQuery(api.documents.getSidebar, {
    userId: JSON.stringify(useCurrentUser()?.id),
  });

  useEffect(() => {
    if (documents !== undefined) {
      setNumber(documents.length); // Update number based on the length of documents array
    }
  }, [documents]);

  return (
    <div onClick={onClick} className=" relative cursor-pointer h-64 w-64 glassblur rounded-xl items-start flex flex-col justify-left  col-start-1 col-span-1">
      <div className="text-3xl bg-transparent font-bold break-words outline-none text-[#CFCFCF] resize-none p-5 pb-2">
        Notes
      </div>
      <div
      className="text-8xl bg-transparent font-bold break-words outline-none text-[#CFCFCF] resize-none px-5">
        {number}
        </div>
        <div      className=" absolute bottom-7 text-1xl bg-transparent break-words outline-none text-[#CFCFCF] resize-none px-5">
 
            <p>You have {number} notes!</p>
        </div>

    </div>
  );
};
