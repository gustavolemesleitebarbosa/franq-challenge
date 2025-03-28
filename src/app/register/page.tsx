"use client";
import { RegisterForm } from "@/components/register-form";
import { useIsAuth } from "@/hooks/useIsAuth";
import Image from "next/image";

export default function RegisterPage() {
  useIsAuth(false);

  return (
    <div className="flex h-screen w-full items-center justify-center font-[family-name:var(--font-geist-sans)]">
      <div className="w-full max-w-sm p-4">
        <div className="mb-4 flex items-center justify-center">
          <Image
            priority
            src="/assets/logo.png"
            height={129}
            width={129}
            alt="Franq Logo"
          />
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
