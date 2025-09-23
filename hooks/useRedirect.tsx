import { useRouter } from "next/navigation";

export default function useRedirect() {
  const router = useRouter();

  const redirectTo = (path: string) => {
    router.push(path);
  };

  return { redirectTo };
}
