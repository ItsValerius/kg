"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const CancelButton = () => {
  const router = useRouter();
  return (
    <Button variant="secondary" onClick={() => router.back()}>
      Abbrechen
    </Button>
  );
};

export default CancelButton;
