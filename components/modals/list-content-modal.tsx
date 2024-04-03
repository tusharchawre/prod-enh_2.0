"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader
  } from "@/components/ui/dialog";
import { useToDo } from "@/hooks/to-do-dialog";

  

  
  

  export const ToDoModal = () => {
   
    return (
      <Dialog open={useToDo().isOpen}>
        <DialogContent>
          <DialogHeader>
            <h2 className="text-center text-lg font-semibold">
              Cover Image
            </h2>
          </DialogHeader>
          
        </DialogContent>
      </Dialog>
    );
  };
  