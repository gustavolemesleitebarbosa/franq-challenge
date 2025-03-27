import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/appwrite";

export function useIsAuth(skipLoginRedirect = false) {
  const router = useRouter();
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadUser() {
      try {
        const loggedInUser = await getCurrentUser();
        if (!loggedInUser && isMounted && !skipLoginRedirect) {
          router.replace("/login");
        } else if (isMounted) {
          setIsLoadingUser(false);
          router.replace("/");
        }
      } catch {
        if (isMounted && !skipLoginRedirect) {
          router.replace("/login");
        }
      }
    }

    void loadUser();

    return () => {
      isMounted = false;
    };
  }, [router, skipLoginRedirect]);

  return { isLoadingUser };
}
