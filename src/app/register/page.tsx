import { RegisterForm } from "@/components/register-form";
import Image from "next/image";

export default function RegisterPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center font-[family-name:var(--font-geist-sans)]">
      <div className="w-full max-w-sm p-4">
        <div className="flex justify-center items-center mb-4" >
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
