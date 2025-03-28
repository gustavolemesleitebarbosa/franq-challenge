"use client";
import { LoginForm } from "@/components/login-form";
import Image from "next/image";
import { useIsAuth } from "@/hooks/useIsAuth";

export default function LoginPage() {
  useIsAuth(false);

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-5 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Image
          priority
          layout="intrinsic"
          src="/assets/logo.png"
          height={129}
          width={129}
          alt="Franq Logo"
          className="mb-4"
        />
        <LoginForm />
      </div>
    </div>
  );
}
