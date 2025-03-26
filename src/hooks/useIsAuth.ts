import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/appwrite";

export function useIsAuth() {
  const router = useRouter();
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  useEffect(() => {
    async function loadUser() {
      try {
        const loggedInUser = await getCurrentUser();
        if (!loggedInUser) {
          router.push("/login");
        } else {
          setIsLoadingUser(false);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error fetching user:", error.message);
        }
        router.push("/login");
      }
    }
    loadUser();
  }, []);

  return { isLoadingUser };
}
