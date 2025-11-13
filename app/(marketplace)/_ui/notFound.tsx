"use client";
import { AlertTriangle, ArrowLeft, House } from "lucide-react";
import { useRouter } from "next/navigation";
import { Title } from "@/ui/text/title";
import { Text } from "@/ui/text/text";
import MainLayout from "@/ui/layout/mainLayout";
import clsx from "clsx";
import MainButton from "@/ui/buttons/mainButton";

type Props = {
  title?: string;
  errorMessage?: string;
  message?: string;
};

export default function NotFoundSection({ title, errorMessage, message }: Props) {
  const router = useRouter();
  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-lg mx-auto p-8">
          <div
            className={clsx(
              "bg-gradient-to-br from-red-50 to-red-100",
              "dark:from-red-900/20 dark:to-red-800/20",
              "rounded-2xl p-6 w-20 h-20",
              "mx-auto mb-8",
              "flex items-center justify-center"
            )}
          >
            <AlertTriangle className="w-10 h-10 text-red-600 dark:text-red-400" />
          </div>

          <Title variant="h2" className="font-bold mb-4">
            {title}
          </Title>

          <Text variant="p" className="mb-3">
            {errorMessage}
          </Text>

          <Text variant="p" className="text-text-secondary mb-10 text-sm">
            {message}
          </Text>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <MainButton text="Volver" variant="outline" icon={ArrowLeft} onClick={() => router.back()} />
            <MainButton text="Ir al inicio" icon={House} onClick={() => router.replace("/feed")} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
