"use client";

import { Children, useEffect, useState } from "react";


import { CoverImageModal } from "@/components/modals/cover-image-modal";
import { ToDoModal } from "../modals/to-do-modal";


export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  
  return (
    <>
     
      <CoverImageModal />

    </>
  );
};
