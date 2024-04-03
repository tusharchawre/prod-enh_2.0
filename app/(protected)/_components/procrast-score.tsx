import "../notes/notes.css"


export const ProcrastinationScore = () =>{
    return (
        <>
       <div  className=" relative cursor-pointer h-64 w-full glassblur rounded-xl items-start flex flex-col justify-left  col-start-2 col-span-2">
      <div className="text-2xl bg-transparent flex font-bold break-words outline-none text-[#CFCFCF] resize-none p-5 pb-2">
        Task Completion
      </div>
      <div className="circle  left-10">

<svg>
  <circle className='bg' cx="50%" cy="50%" r="4vw" />
  <circle className='progress' cx="50%" cy="50%" r="4vw" />

</svg>
        <div      className="  text-1xl bg-transparent break-words outline-none text-[#CFCFCF] resize-none px-5">
 
            <p>You have 0 notes!</p>
        </div>
</div>

    </div>
        </> 
    )
}