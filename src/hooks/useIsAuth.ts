"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { account, getCurrentUser } from "@/lib/appwrite";

export function useIsAuth(isAuthRoute: boolean) {
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const router = useRouter();

  const handleSessionExpired = async () => {
    if (localStorage.getItem("sessionLogIn")) {
      const sessionLogIn = new Date(localStorage.getItem("sessionLogIn")!); // Converte a string para Date
      const now = new Date();
      const diffMinutes = (now.getTime() - sessionLogIn.getTime()) / 1000 / 60;

      if (diffMinutes > 2) {
        await account.deleteSession("current");
        localStorage.clear();
        router.replace("/login");
        return true;
      }
    }
    return false;
  }

  const handleUserAuthenticated = async (user: { name: string, email: string }) => {
    if (!localStorage.getItem("name") && user.name) {
      localStorage.setItem("name", user.name);
    }
    if (!localStorage.getItem("email") && user.email) {
      localStorage.setItem("email", user.email);
    }
    if (!localStorage.getItem("sessionLogIn")) {
      localStorage.setItem("sessionLogIn", new Date().toISOString());
    }
  }

  useEffect(() => {
    async function verifyAuth() {
      try {
        const user = await getCurrentUser();
        const isAuthenticated = !!user;
        const isSessionExpired = await handleSessionExpired();
        if (isSessionExpired) {
          return;
        }
        if (isAuthenticated) {
          handleUserAuthenticated(user);
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
