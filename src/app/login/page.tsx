"use client";
import { LoginForm } from "@/components/login-form";
import Image from "next/image";
import { useIsAuth } from "@/hooks/useIsAuth";

export default function LoginPage() {
  useIsAuth(false);

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-5 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-3 max-h-12">
          <Image
            priority
            layout="intrinsic"
            src="/assets/logo.png"
            height={129}
            width={129}
            alt="Franq Logo"
          />
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
