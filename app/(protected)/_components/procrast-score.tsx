"use client"


import { useQuery } from "convex/react";
import "../notes/notes.css"
import { api } from "@/convex/_generated/api";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


export const ProcrastinationScore = () =>{
  const [percentage, setPercentage] = useState(0)


  const [number, setNumber] = useState(0);
  const [number2, setNumber2] = useState(0);


  const router = useRouter()

  const onClick = () => {
      router.push(`/to-do`)
      
  }



  const lists = useQuery(api.lists.getUnfinished, {
    userId: JSON.stringify(useCurrentUser()?.id),
  });

  useEffect(() => {
    if (lists !== undefined) {
      setNumber(lists.length); // Update number based on the length of documents array
    }
  }, [lists]);


  const lists2 = useQuery(api.lists.getList, {
    userId: JSON.stringify(useCurrentUser()?.id),
  });

  useEffect(() => {
    if (lists2 !== undefined) {
      setNumber2(lists2.length); // Update number based on the length of documents array
    }
  }, [lists2]);
 


  useEffect(() => {
  const ratio = ((number2-number)/number2)
    if (ratio !== undefined) {
      setPercentage(ratio*100); 
      
    }

  });

  





    return (
        <>
       <div role="button" onClick={onClick} className=" relative cursor-pointer h-64 w-full glassblur rounded-xl items-start  col-start-2 col-span-2">
      <div className="text-2xl bg-transparent flex font-bold break-words outline-none text-[#CFCFCF] resize-none p-5 pb-2">
        Task Completion
      </div>
<div className="flex items-center justify-evenly translate-y-12">
<div className=" relative flex items-center justify-center h-full ">
      <div className="absolute w-48 h-48 scale-90">

      <CircularProgressbar value={percentage}  styles={{
        trail: {
          stroke: '#1b2a33',
        },}}/>

        </div>
      <div className="percentage">{percentage}%</div>

    </div>
    <p className="text w-[40%]">You have completed <span className="text-xl">{number}</span> lists out of <span className="text-xl">{number2}</span> lists.</p>


    </div>





        
</div>

        </> 
    )
}