/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCatalogStore } from "@/store/catalog";

export default function InitApp() {
  const router = useRouter();
  const { storeData, marketData, initialized } = useCatalogStore();

  // Redirect when both are loaded
  useEffect(() => {
    if (initialized && (marketData || storeData)) {
      router.replace("/feed");
    }
  }, [initialized, storeData, marketData]);

  return null;
}
