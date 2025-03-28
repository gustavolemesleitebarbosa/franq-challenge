"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/appwrite";

export function useIsAuth(isAuthRoute: boolean) {
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const router = useRouter();

  useEffect(() => {
    async function verifyAuth() {
      const user = await getCurrentUser();
      const isAuthenticated = !!user;

      if (isAuthRoute && !isAuthenticated) {
        router.replace("/login"); // Redirect if user is not authenticated
      } else if (!isAuthRoute && isAuthenticated) {
        router.replace("/"); // Redirect if user is authenticated but on a public page
      }

      setIsAuthenticated(isAuthenticated);

      setIsLoadingUser(false);
    }

    verifyAuth();
  }, [isAuthRoute, router]);

  return { isLoadingUser, isAuthenticated };
}
