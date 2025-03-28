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
      try {
        const user = await getCurrentUser();
        const isAuthenticated = !!user;

        if (isAuthenticated) {
          if (!localStorage.getItem("name") && user.name) {
            localStorage.setItem("name", user.name);
          }
          if (!localStorage.getItem("email") && user.email) {
            localStorage.setItem("email", user.email);
          }
        }

        if (isAuthRoute && !isAuthenticated) {
          router.replace("/login");
        } else if (!isAuthRoute && isAuthenticated) {
          router.replace("/");
        }

        setIsAuthenticated(isAuthenticated);
      } catch (error) {
        console.error("Authentication check failed:", error);

        if (isAuthRoute) {
          router.replace("/login");
        }

        setIsAuthenticated(false);
      } finally {
        setIsLoadingUser(false);
      }
    }

    void verifyAuth();
  }, [isAuthRoute, router]);

  return { isLoadingUser, isAuthenticated };
}
