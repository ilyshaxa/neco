"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export function NotFoundButtons() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center">
      <Button 
        onClick={() => router.back()} 
        className="group"
      >
        <ArrowLeft className="h-4 w-4 mr-1 transition-transform group-hover:-translate-x-1" />
        Go Back
      </Button>
    </div>
  );
}

