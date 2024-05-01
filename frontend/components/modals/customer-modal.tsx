"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Modal } from "@/components/ui/modal";
import { useCustomerModal } from "@/hooks/use-customer-modal";
import { Button } from "@/components/ui/button";
export const CustomerModal = () => {
  const customerModal = useCustomerModal();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  return (
    <Modal
      title='Customer Details'
      description=''
      isOpen={customerModal.isOpen}
      onClose={customerModal.onClose}
    >
      <div> hey modal</div>
    </Modal>
  );
};
