"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCatalogStore } from "@/store/catalog";

export default function InitApp() {
  const router = useRouter();
  const { storeData, marketData, initialized } = useCatalogStore();

  // Redirect when both are loaded
  useEffect(() => {
    if (initialized && storeData && marketData) {
      router.replace("/feed");
    }
  }, [initialized, storeData, marketData, router]);

  return null;
}
