"use client";

import { useEffect, useState } from "react";

import { CustomerModal } from "@/components/modals/customer-modal";

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
      <CustomerModal />
    </>
  );
};
