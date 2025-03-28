import { LoginForm } from "@/components/login-form";
import Image from "next/image";
export default function LoginPage() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-5 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-center mb-4">
          <Image
            priority
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
