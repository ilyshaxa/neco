"use client";

import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white dark:bg-[#0D1117] flex items-center justify-center px-6">
      <Empty>
        <EmptyHeader>
          <EmptyTitle className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-green-500 bg-clip-text text-transparent">
            {t("title")}
          </EmptyTitle>
          <EmptyDescription className="text-lg">
            {t("description")}
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex items-center justify-center">
            <Button onClick={handleBackClick} className="group">
              <ArrowLeft className="h-4 w-4 mr-1 transition-transform group-hover:-translate-x-1" />
              {t("goBack")}
            </Button>
          </div>
        </EmptyContent>
      </Empty>
    </div>
  );
}

