import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
  

import "../(protected)/notes/notes.css"





export default function Navigationlayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {







      return (
          <>
          {children}
          <div className="absolute bottom-6 z-[999999999999999999] flex justify-center w-full">
        <Pagination className=" text-white border-white rounded-lg w-auto px-3  ">
  <PaginationContent>
  
    <PaginationItem >
      <PaginationLink href="/dashboard" className="w-32">Dashboard</PaginationLink>
    </PaginationItem>
    <PaginationItem >
      <PaginationLink href="/notes" className="w-32">Notes</PaginationLink>
    </PaginationItem>
    <PaginationItem >
      <PaginationLink href="/to-do" className="w-32">To-do</PaginationLink>
    </PaginationItem>
  
  
  
  
  </PaginationContent>
</Pagination>
</div>
        </>
      
    )
  }