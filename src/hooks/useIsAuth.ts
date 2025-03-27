import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/appwrite";

export function useIsAuth() {
  const router = useRouter();
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadUser() {
      try {
        const loggedInUser = await getCurrentUser();
        if (!loggedInUser && isMounted) {
          router.replace("/login");
        } else if (isMounted) {
          setIsLoadingUser(false);
          router.replace("/");
        }
      } catch {
        if (isMounted) {
          router.replace("/login");
        }
      }
    }

    void loadUser();

    return () => {
      isMounted = false;
    };
  }, [router]);

  return { isLoadingUser };
}
