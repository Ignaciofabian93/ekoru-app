import useSessionStore from "@/store/session";
import { useRouter } from "next/navigation";

export default function useLogout() {
  const router = useRouter();
  const { clearSession } = useSessionStore();

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST", credentials: "include" });
    clearSession();
    router.replace("/feed");
  };

  return { handleLogout };
}
